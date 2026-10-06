# NodeJS App to manage Users (CRUD)

REST API to manage users

# Start with docker compose

1. Install Docker Compose on your computer (https://docs.docker.com/compose/install/)
2. Run Docker on your computer
3. Copy the environment file: `cp .env.example .env`
4. Run the command 'docker-compose up'

# Start with local environement

1. Install and run MongoDB service on your computer, on localhost:27017
2. Copy the environment file: `cp .env.example .env`, and set `MONGODB_URL` to `mongodb://localhost:27017/users-timezone`
3. Run the command 'yarn start' or 'npm start'

Web API will be accessible to : http://localhost:3001/api/

# What I used to make this app

Express for the node.js api\
Multer middleware to manage file upload\
MongoDB as database\
Mongoose for mongodb object modeling in node.js\
Docker compose to run the nodejs api and database instance

# Tests

Run `npm install` then `npm test`. The tests use Node.js's built-in test runner (Node.js 18 or later) and replace the Mongoose model with an in-memory fake, so they need no database.
