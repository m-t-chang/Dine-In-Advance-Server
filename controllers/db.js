const express = require("express");
const router = express.Router();

// Mongoose Models
const Restaurant = require("../models/restaurant.js");
const Booking = require("../models/booking.js");
const seedRestaurants = require("../models/seedRestaurants.js");
const seedBookings = require("../models/seedBookings.js");

const fetch = require("node-fetch");

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

// This will both test the POST function and also seed the DB for testing the checkAvailable functionality

router.get("/test/full", async (req, res) => {
    console.log("test: tables all full route reached");

    const newBooking = {
        customerInfo: {
            name: "Table Hogger",
            email: "thogger@gmail.com",
            contactNo: "1234 5678",
        },
        groupSize: 1,
        specialRequests: "haha",
        date: "2022-01-20",
        hoursBooked: [18],
        restaurantName: "Chang & Chin",
    };

    try {
        // send this to POST 10 times.
        for (let i = 0; i < 12; i++)
            fetch("http://localhost:5000/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBooking),
            });
        res.send("success");
    } catch (err) {
        console.log("error:", err);
        res.send(err);
    }
});

//////////////////////////////////////////
// EXPORT
//////////////////////////////////////////

module.exports = router;
