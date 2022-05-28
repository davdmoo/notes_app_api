require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

const { connect } = require("./config/mongoConnection");
const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => res.send("Hello world!"));

app.use(router);

connect()
  .then((_) => {
    app.listen(port, () => console.log("Listening at localhost"));
  })
  .catch((error) => {
    console.log(error);
  })
