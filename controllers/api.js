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

// Expected Request Body: (similar to a "booking" object in schema)
const examplePostBody = {
    restaurantName: "Chang & Chin",
    newBooking: {
        tableNumber: 1,
        customerInfo: {
            name: "Elon Musk",
            email: "elon@tesla.com",
            contactNo: "510 555 1111",
        },
        groupSize: 2,
        specialRequests: "",
        date: 1644508800,
        hoursBooked: [16],
        deletedFlag: false,
    },
};

router.post("/booking", async (req, res) => {
    console.log("API: post booking with body: ", req.body);
    // Server will need to insert default values for things...
    //  find a table number for it, based on the restaurant, date, group size, and hours booked
    //          function (restaurant, date, groupSize, hoursBooked) {
    //                    if found, return tableNumber
    //                      otherwise return "no table found"
    //                }
    //  give a reservation ID
    //  deletedFlag = false

    // insert into database
    try {
        const doc = await Restaurant.findOne({
            restaurantName: req.body.restaurantName,
        });
        doc.bookings.push(req.body.newBooking);
        const savedDoc = await doc.save();
        console.log(`Updated: ${savedDoc}`);
        res.json(savedDoc);
    } catch (err) {
        console.log("ERROR: ", err.message);
        res.status(500).send(err);
    }

    //  return...
    //      fail (status 500, with error message as JSON), or
    //      success and the inserted object, which includes ID
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
