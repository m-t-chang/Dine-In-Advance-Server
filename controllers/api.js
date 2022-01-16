const express = require("express");
const Restaurant = require("../models/restaurant");
const router = express.Router();

//////////////////////////////////////////
// ENDPOINTS
//////////////////////////////////////////

router.get("/checkAvailable", (req, res) => {
    console.log("route reached");
    res.json({ payload: "hello world!" });
});

// Expected Request is something like
//      {{server}}/api/booking?id=12345
// Returns the booking with the ID. But it's still structured like the Restaurant schema
router.get("/booking", (req, res, next) => {
    console.log("API: get booking");

    // check for missing ID
    if (typeof req.query.id === "undefined") {
        res.status(400).json({
            status: 400,
            message: "Error. No reservation ID provided.",
        });
        next();
        return;
    }

    // find the ID, and send response
    Restaurant.find({ "bookings._id": req.query.id })
        .select({ "bookings.$": 1 })
        .exec((err, restaurant) => {
            if (err) {
                res.send(err);
            } else {
                res.json(restaurant);
            }
        });
});

// Expected Request Body: (same as a "booking" object in schema)
// NOTE THIS IS OUT OF DATE
const examplePostBody = {
    restaurant: "chang & chin", // note that this does not end up in the final data
    _id: "res_1234",
    tableNumber: 12,
    customerInfo: {
        name: "blah",
        email: "blah@chicken.com",
        contactNo: "12345",
    },
    groupSize: 5,
    specialRequests: "sometext",
    date: "12345", //UTC time. only the date portion will be used, since hours will be in "hoursBooked"
    hoursBooked: [14, 15],
    deletedFlag: false,
};

router.post("/booking", (req, res) => {
    // Server will need to insert default values for things...
    //  find a table number for it, based on the restaurant, date, group size, and hours booked
    //          function (restaurant, date, groupSize, hoursBooked) {
    //                    if found, return tableNumber
    //                      otherwise return "no table found"
    //                }
    //  give a reservation ID
    //  deletedFlag = false
    // insert into database
    //  return...
    //      fail (status 500, with error message as JSON), or
    //      success and the inserted object, which includes ID
    console.log("route reached");
    res.json({ payload: "hello world!" });
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
