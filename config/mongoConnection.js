const { MongoClient } = require("mongodb");

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

let db;

function connect() {
  return client.connect()
    .then((_) => {
      db = client.db("notes_api");

      console.log("Successfully connnected to MongoDB.");
    })
    .catch(error => {
      console.log(error);
      db = null;

      return null;
    })
}

function getDatabase() {
  return db;
}

module.exports = { connect, getDatabase };
