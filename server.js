require("dotenv").config();
const path = require("path");

//////////////////////////////////////////
// MONGOOSE
//////////////////////////////////////////

// Dependencies
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// Config
//const mongoURI = "mongodb://127.0.0.1:27017/dine-in-advance";
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.g7nbg.mongodb.net/dine-in-advance?retryWrites=true&w=majority`;

// Connect to Mongo
mongoose.connect(
    mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("The connection with mongod is established");
    }
);

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

//////////////////////////////////////////
// EXPRESS
//////////////////////////////////////////

// set up
const express = require("express");
const apiController = require("./controllers/api.js");
const dbController = require("./controllers/db.js");
const app = express();

// body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname, "public")));

// import API endpoints
app.use("/api", apiController);
app.use("/db", dbController);

// start server
const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
