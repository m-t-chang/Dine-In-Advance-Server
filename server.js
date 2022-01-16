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
const mongoURI = "mongodb://localhost:27017/dine-in-advance";

// Models
const Restaurant = require("./models/restaurant.js");
//const hotelSeed = require("./models/seed.js");

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

// run a mongo create
Restaurant.create({ name: "test rest" }, (err, data) => {
    if (err) console.log(err.message);
    console.log("added one data");
});

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
