const express = require("express");
const router = express.Router();

const Restaurant = require("../models/restaurant");
const Booking = require("../models/booking");

//////////////////////////////////////////
// ENDPOINTS
//////////////////////////////////////////

router.get("/checkAvailable", (req, res) => {
    console.log("route reached");
    res.json({ payload: "hello world!" });
    // return things in arrays
});

// Expected Request is something like
//      {{server}}/api/booking?id=12345
// Returns the booking with the ID. But it's still structured like the Restaurant schema
router.get("/booking", async (req, res, next) => {
    console.log("API: get booking");

    // check for missing ID
    if (typeof req.query.id === "undefined") {
        // get list of IDs
        const listOfBookingIDs = await Booking.find({})
            .select({ _id: 1 })
            .exec();

        res.status(400).json({
            status: 400,
            message: "Error. No reservation ID provided.",
            bookingIDs: listOfBookingIDs,
        });
        next();
        return;
    }

    // find the ID, and send response
    Booking.findById(req.query.id).exec((err, restaurant) => {
        if (err) {
            res.send(err);
        } else {
            res.json(restaurant);
        }
    });
});

// Expected Request Body is just a Booking document (see the Booking schema), but without tableNumber or deletedFlag
// We are using the MongoDB-generated "_id" as the reservation number to pass to the user
router.post("/booking", async (req, res) => {
    console.log("API: post booking with body: ", req.body);

    // // check whether its valid reservation available
    //  find a table number for it, based on the restaurant, date, group size, and hours booked
    //          function (restaurant, date, groupSize, hoursBooked) {
    //                    if found, return tableNumber
    //                      otherwise return "no table found"
    //                }

    // set deletedFlag = false
    req.body.deletedFlag = false;

    // insert into database
    Booking.create(req.body, (err, doc) => {
        if (err) {
            console.log("ERROR: ", err.message);
            res.status(500).send(err);
        } else {
            console.log(`Updated: ${doc}`);
            res.json(doc);
        }
    });
});

router.patch("/booking", (req, res) => {
    console.log("route reached");
    res.json({ payload: "hello world!" });
});

router.delete("/booking", (req, res) => {
    // find the booking, set deletedFlag = true
    console.log("route reached");
    res.json({ payload: "hello world!" });
});

//////////////////////////////////////////
// EXPORT
//////////////////////////////////////////

module.exports = router;
