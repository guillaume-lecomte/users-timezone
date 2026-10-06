// Run with: npm test (needs Node.js 18 or later, no database: the Mongoose
// model is replaced by an in-memory fake).
const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const express = require("express");
const bodyParser = require("body-parser");

class FakeUser {
  static users = [];
  static nextId = 1;

  constructor(data) {
    Object.assign(this, data);
  }

  async save() {
    const taken = FakeUser.users.some(
      (u) => u.username === this.username && u._id !== this._id
    );
    if (taken) {
      throw Object.assign(new Error("E11000 duplicate key"), { code: 11000 });
    }
    if (!this._id) {
      this._id = String(FakeUser.nextId++);
      FakeUser.users.push(this);
    }
    return this;
  }

  toJSON() {
    return { ...this };
  }

  static async find() {
    return [...FakeUser.users];
  }

  static async findOne({ _id }) {
    return FakeUser.users.find((u) => u._id === _id) || null;
  }

  static async deleteOne(user) {
    FakeUser.users = FakeUser.users.filter((u) => u._id !== user._id);
  }
}

const modelPath = require.resolve("../src/user/model");
require.cache[modelPath] = {
  id: modelPath,
  filename: modelPath,
  loaded: true,
  exports: FakeUser,
};

const routes = require("../src/routes");

// A handler that answers twice ends in an unhandled rejection, which stops
// the process on Node.js 15 and later.
const unhandled = [];
process.on("unhandledRejection", (error) => unhandled.push(error));

let server;
let base;

test.before(async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use("/api", routes);
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://localhost:${server.address().port}/api`;
});

test.after(() => server.close());

test.beforeEach(() => {
  FakeUser.users = [];
  FakeUser.nextId = 1;
});

const png = (text) => new Blob([text], { type: "image/png" });

const form = (fields, picture) => {
  const body = new FormData();
  Object.entries(fields).forEach(([key, value]) => body.append(key, value));
  if (picture) body.append("picture", picture, "avatar.png");
  return body;
};

const createUser = (username = "alice") =>
  fetch(`${base}/users`, {
    method: "POST",
    body: form({ username, timeZone: "Europe/Paris" }, png("avatar-1")),
  });

test("GET /users/:id answers 404 once for an unknown id", async () => {
  const response = await fetch(`${base}/users/unknown`);
  assert.strictEqual(response.status, 404);
});

test("GET /users/:id returns an existing user", async () => {
  const created = await (await createUser()).json();
  const response = await fetch(`${base}/users/${created._id}`);

  assert.strictEqual(response.status, 200);
  assert.strictEqual((await response.json()).username, "alice");
});

test("POST /users stores the avatar as base64", async () => {
  const response = await createUser();
  const user = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(user.picture, Buffer.from("avatar-1").toString("base64"));
});

test("POST /users without a picture answers 400", async () => {
  const response = await fetch(`${base}/users`, {
    method: "POST",
    body: form({ username: "bob", timeZone: "Europe/Paris" }),
  });
  assert.strictEqual(response.status, 400);
});

test("POST /users with a username already used answers 409", async () => {
  await createUser("alice");
  const response = await createUser("alice");
  assert.strictEqual(response.status, 409);
});

test("PUT /users/:id answers 404 for an unknown id", async () => {
  const response = await fetch(`${base}/users/unknown`, {
    method: "PUT",
    body: form({ username: "x", timeZone: "UTC" }),
  });
  assert.strictEqual(response.status, 404);
});

test("PUT /users/:id keeps the current picture when none is sent", async () => {
  const created = await (await createUser()).json();
  const response = await fetch(`${base}/users/${created._id}`, {
    method: "PUT",
    body: form({ username: "alice2", timeZone: "Asia/Tokyo" }),
  });
  const updated = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(updated.username, "alice2");
  assert.strictEqual(updated.timeZone, "Asia/Tokyo");
  assert.strictEqual(updated.picture, created.picture);
});

test("PUT /users/:id replaces the picture when a file is sent", async () => {
  const created = await (await createUser()).json();
  const response = await fetch(`${base}/users/${created._id}`, {
    method: "PUT",
    body: form({ username: "alice", timeZone: "UTC" }, png("avatar-2")),
  });

  assert.strictEqual(
    (await response.json()).picture,
    Buffer.from("avatar-2").toString("base64")
  );
});

test("DELETE /users/:id answers 404 for an unknown id, 204 otherwise", async () => {
  const unknown = await fetch(`${base}/users/unknown`, { method: "DELETE" });
  assert.strictEqual(unknown.status, 404);

  const created = await (await createUser()).json();
  const deleted = await fetch(`${base}/users/${created._id}`, {
    method: "DELETE",
  });
  assert.strictEqual(deleted.status, 204);
  assert.strictEqual(FakeUser.users.length, 0);
});

test("no handler answers twice, whatever the id", async () => {
  await fetch(`${base}/users/unknown`);
  await fetch(`${base}/users/unknown`, { method: "PUT", body: form({}) });
  await fetch(`${base}/users/unknown`, { method: "DELETE" });
  await new Promise((resolve) => setTimeout(resolve, 50));

  assert.deepStrictEqual(
    unhandled.map((error) => error.code || error.message),
    []
  );
});
