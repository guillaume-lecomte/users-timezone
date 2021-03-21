if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  databaseUrl: process.env.MONGODB_URL,
  defaultPort: process.env.PORT,
  maxFileUploadSize: process.env.MAX_FILE_UPLOAD_SIZE,
};
