const db = require("mongoose");
const env = require("../../config");

const createConnection = () => {
  db.connect(env.DB_URI, { useNewURLParser: true });
  db.connection.once("open", () => {
    console.log("Database Connection Established Successfully");
  });
};

module.exports = { createConnection };
