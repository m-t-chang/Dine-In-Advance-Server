const express = require("express");
const router = express.Router();

// Mongoose Models
const Restaurant = require("../models/restaurant.js");
const Booking = require("../models/booking.js");
const seedRestaurants = require("../models/seedRestaurants.js");
const seedBookings = require("../models/seedBookings.js");

//////////////////////////////////////////
// ENDPOINTS
//////////////////////////////////////////

router.get("/seed", async (req, res) => {
    console.log("seed route reached");

    try {
        const jsonToSend = {};

        await Restaurant.collection.drop();
        jsonToSend.Restaurant = await Restaurant.insertMany(seedRestaurants);

        await Booking.collection.drop();
        jsonToSend.Booking = await Booking.insertMany(seedBookings);

        res.json(jsonToSend);
    } catch (err) {
        res.send(err);
    }
});

//////////////////////////////////////////
// EXPORT
//////////////////////////////////////////

module.exports = router;
