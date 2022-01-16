const express = require("express");
const router = express.Router();

// Mongoose Models
const Restaurant = require("../models/restaurant.js");
const seedData = require("../models/seed.js");

//////////////////////////////////////////
// ENDPOINTS
//////////////////////////////////////////

router.get("/seed", async (req, res) => {
    console.log("seed route reached");

    // drop db
    await Restaurant.collection.drop();

    // load seed data
    await Restaurant.create(seedData, (err, data) => {
        if (err) {
            console.log(err.message);
            res.send(`db seed error: ${err.message}`);
        } else {
            console.log("added seed data");
            res.send("db seed complete");
        }
    });
});

//////////////////////////////////////////
// EXPORT
//////////////////////////////////////////

module.exports = router;
