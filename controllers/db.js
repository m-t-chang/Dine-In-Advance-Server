const express = require("express");
const router = express.Router();

const seedData = require("../models/seed.js");

//////////////////////////////////////////
// ENDPOINTS
//////////////////////////////////////////

router.get("/seed", (req, res) => {
    console.log("seed route reached");
    res.send("db seed complete");
});

//////////////////////////////////////////
// EXPORT
//////////////////////////////////////////

module.exports = router;
