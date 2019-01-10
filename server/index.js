const express = require("express");
const http = require("http"); // native node library
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const cors = require("cors");

// db setup
mongoose.connect("mongodb://localhost/auth");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connection to mongodb is open");
});

// App setup
// register middleware
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" })); // parse any requests as json
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on port: " + port);
