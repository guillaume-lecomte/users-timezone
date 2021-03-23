const express = require("express");
const multer = require("multer");
const { maxFileUploadSize } = require("./config");
const { getBase64FromBuffer, isBase64Input } = require("./utils");
const User = require("./user/model");
const router = express.Router();

const upload = multer({
  limits: { fileSize: maxFileUploadSize },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("You need to upload png, jpeg or jpg file."));
    }
    cb(undefined, true);
  },
});

router.get("/", (req, res) => {
  res.json({ message: "I'm alive :)" });
});

router.get("/users", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
});

router.post("/users", upload.single("picture"), async (req, res) => {
  try {
    const { username, timeZone } = req.body;
    const base64img = getBase64FromBuffer(req.file.buffer);

    const user = new User({
      username,
      picture: base64img,
      timeZone,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.warn(error);
    res.sendStatus(500);
  }
});

router.put("/users/:id", upload.single("picture"), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.sendStatus(404);
    }
    const { picture, username, timeZone } = req.body;

    let base64img = null;
    if (picture && !req.file && isBase64Input(picture)) {
      base64img = picture;
    } else {
      base64img = getBase64FromBuffer(req.file.buffer);
    }

    user.username = username;
    user.picture = base64img;
    user.timeZone = timeZone;

    await user.save();
    res.send(user);
  } catch (error) {
    console.warn(error);
    res.sendStatus(500);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.sendStatus(404);
    }

    await User.deleteOne(user);
    res.status(204).send();
  } catch (error) {
    console.warn(error);
    res.sendStatus(500);
  }
});

module.exports = router;
