require("dotenv").config();
const express = require("express");
const path = require("path");

const apiController = require("./controllers/api.js");
const app = express();

// body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname, "public")));

// import API endpoints
app.use("/api", apiController);

//////////////////////////////////////////
// START SERVER
//////////////////////////////////////////

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
