const express = require("express");
const router = express.Router();

const Restaurant = require("../models/restaurant");
const Booking = require("../models/booking");

function listOfBookingIDs() {
    return Booking.find({}).select({ _id: 1 }).exec();
}

function respondWithDocOrError(res) {
    return (err, doc) => {
        if (err) {
            res.send(err);
        } else {
            res.json(doc);
        }
    };
}

//////////////////////////////////////////
// ENDPOINTS
//////////////////////////////////////////

router.get("/checkAvailable", async (req, res) => {
    /*

    Inputs (keys in req.body) -> Outputs
    ------------------------------------
    {} -> [ restaurants ]
    { restaurantName: String, groupSize: integer, date: unix time in seconds } -> [ times as integers ]

    */
    console.log("API: checkAvailable route reached, with body: ", req.body);

    if (typeof req.body.restaurantName === "undefined") {
        // RETURN: all restaurants
        Restaurant.find()
            .select({ restaurantName: 1 })
            .exec(respondWithDocOrError(res));
    } else if (
        typeof req.body.groupSize !== "undefined" &&
        typeof req.body.date !== "undefined"
    ) {
        // RETURN: array of times for the given date
        // NOTE: does not check against existing reservations
        const bookingDate = new Date(req.body.date * 1000);
        const thisRestaurant = await Restaurant.findOne({
            restaurantName: req.body.restaurantName,
        });
        res.json(thisRestaurant.operatingHours[bookingDate.getDay()]);
    } else {
        res.send("Unknown Error");
    }
});

// Expected Request is something like
//      {{server}}/api/booking?id=12345
// Returns the booking with the ID.
router.get("/booking", async (req, res, next) => {
    console.log("API: get booking");

    // check for missing ID
    if (typeof req.query.id === "undefined") {
        res.status(400).json({
            status: 400,
            message: "Error. No reservation ID provided.",
            bookingIDs: await listOfBookingIDs(),
        });
        next();
        return;
    }

    // find the ID, and send response
    Booking.findOne(req.query.id).exec((err, doc) => {
        if (err) {
            res.send(err);
        } else {
            res.json(doc);
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

router.patch("/booking", (req, res, next) => {
    console.log("API: patch endpoint reached");
    res.json({ payload: "hello world!" });
});

// Delete endpoint
// will check if the document is already deleted, and return an error if so
router.delete("/booking", async (req, res, next) => {
    console.log("API: delete endpoint reached");

    // check for missing ID
    if (typeof req.query.id === "undefined") {
        res.status(400).json({
            status: 400,
            message: "Error. No reservation ID provided.",
            bookingIDs: await listOfBookingIDs(),
        });
        next();
        return;
    }

    // find the booking, set deletedFlag = true
    try {
        const doc = await Booking.findById(req.query.id);
        if (doc.deletedFlag === true) {
            res.send("Warning: Booking is already deleted, no changes made");
        } else {
            doc.deletedFlag = true;
            const savedDoc = await doc.save();
            res.json(savedDoc);
        }
    } catch (err) {
        res.send(err);
    }
});

//////////////////////////////////////////
// EXPORT
//////////////////////////////////////////

module.exports = router;
