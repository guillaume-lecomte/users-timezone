# users-timezone

A small web app to manage users (name, avatar, time zone) and see what time it is for each of them right now.

**Status: archived.** Written in early 2021, last activity 2021-05-06. It is kept as a record, not maintained.

## What it does

The client lists users and lets you create, edit and delete them. A timeline page shows each user with their local time, ordered by that time. The server stores users in MongoDB and keeps the avatar as a base64 string in the document.

## How it is built

- **Client** ([`client/`](client)): React 17 on Create React App, Redux with Redux-Saga for the side effects ([`usersSaga.js`](client/src/sagas/usersSaga.js)), a `reselect` selector that computes each user's local time ([`userSelector.js`](client/src/selectors/userSelector.js)), `moment-timezone` for the conversion ([`timeZone.js`](client/src/utils/timeZone.js)), Material UI v4 for the components.
- **Server** ([`server/`](server)): Express 4 with Mongoose 5, `multer` for the avatar upload with a size limit and a jpg/jpeg/png filter ([`routes.js`](server/src/routes.js)), a Dockerfile and a Compose file that starts the API and MongoDB ([`docker-compose.yml`](server/docker-compose.yml)).

Setup notes for each part are in [`server/README.md`](server/README.md) and [`client/README.md`](client/README.md). In short, the server runs with `docker-compose up` in `server/` (API on port 3001), and the client runs with `yarn start` or `npm start` in `client/` (port 3000).

These commands were not run when this README was written. The repository has no lockfile for either part, so the dependency versions are not pinned.

## Known issues

- Three handlers in [`server/src/routes.js`](server/src/routes.js) call `res.sendStatus(404)` without returning, then keep going. `GET /users/:id` for an unknown id tries to answer twice, in an `async` handler with no `try/catch`.
- Avatars are stored as base64 strings inside the user documents.
- The local-time selector only recomputes when the user list changes, and it writes `localeTime` onto the objects held in the Redux state. Read from the code: the times on the timeline do not update on their own.
- No automated tests.
- No lockfile, and the dependencies are from 2021 (Create React App 4, Mongoose 5, Material UI v4). They were not audited.
- [`server/.env`](server/.env) is committed. It holds only a connection string to the Compose service, a port and an upload size, no credentials.

## License

No license file in the repository.
