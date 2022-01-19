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
            res.json(err);
        } else {
            res.json(doc);
        }
    };
}

//////////////////////////////////////////
// ENDPOINTS
//////////////////////////////////////////

router.post("/checkAvailable", async (req, res) => {
    /*

    Inputs (keys in req.query) -> Outputs
    ------------------------------------
    {} -> [ restaurants ]
    { restaurantName: String, groupSize: integer, date: unix time in seconds } -> [ times as integers ]

    */
    console.log("API: checkAvailable route reached, with body of: ", req.body);

    switch (req.body.checker) {
        case "restaurant": {
            Restaurant.find()
                .select({ restaurantName: 1 })
                .exec(respondWithDocOrError(res));
            break;
        }

        case "group": {
            Restaurant.findOne({
                restaurantName: req.body.restaurantState,
            })
                .select({ tables: 1 })
                .exec(respondWithDocOrError(res));
            break;
        }
        case "time": {
            const restaurantObj = await Restaurant.findOne({
                restaurantName: req.body.restaurantState,
            })
                .select({ operatingHours: 1, tables: 1 })
                .exec();

            const bookingDay = new Date(req.body.dateState).getDay();
            let restaurantHours = restaurantObj.operatingHours[bookingDay];
            const maxFittingTables = restaurantObj.tables.filter(
                (x) => x.maxGroupSize >= req.body.groupState
            ).length;

            const bookingsOnSameDayArr = await Booking.find({
                restaurantName: req.body.restaurantState,
                date: req.body.dateState,
                group: { $gte: req.body.groupState },
            })
                .select({ hoursBooked: 1 })
                .exec();

            console.log(bookingsOnSameDayArr);
            const bookedHours = bookingsOnSameDayArr.map(
                (x) => x.hoursBooked[0]
            );
            console.log(bookedHours);
            const counts = {};
            for (let hour of bookedHours) {
                counts[hour] = counts[hour] ? counts[hour] + 1 : 1;
            }
            console.log(counts);
            const counterArr = Object.entries(counts);
            const fullHours = [];
            for (let hour of counterArr) {
                if (hour[1] >= maxFittingTables) {
                    fullHours.push(hour[0]);
                }
            }
            console.log(fullHours);

            for (let fullHour of fullHours) {
                restaurantHours = restaurantHours.filter((x) => x != fullHour);
            }

            res.send(restaurantHours);
            break;
        }
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
    Booking.findById(req.query.id).exec((err, doc) => {
        if (err) {
            res.json(err);
        } else {
            res.json(doc);
        }
    });
});

// Expected Request Body is just a Booking document (see the Booking schema), but without tableNumber or deletedFlag
// We are using the MongoDB-generated "_id" as the reservation number to pass to the user
router.post("/booking", async (req, res) => {
    console.log("API: post booking with body: ", req.body);

    const bookingAtSameTime = await Booking.find({
        restaurantName: req.body.restaurantName,
        date: req.body.date,
        hoursBooked: [req.body.hoursBooked[0]],
        groupSize: { $gte: req.body.groupSize },
    })
        .select({ tableNumber: 1 })
        .exec();

    // console.log("bookingAtSameTime: ", bookingAtSameTime);

    const availTables = await Restaurant.find({
        restaurantName: req.body.restaurantName,
    })
        .select({ tables: 1 })
        .exec();

    // console.log("availTables: ", availTables);

    let availFittingTables = availTables[0].tables.filter(
        (x) => x.maxGroupSize >= req.body.groupSize
    );

    // console.log("req.body.groupSize: ", req.body.groupSize);
    // console.log("availTables[0].tables: ", availTables[0].tables);
    // console.log("availFittingTables: ", availFittingTables);

    for (let booking of bookingAtSameTime) {
        availFittingTables = availFittingTables.filter(
            (x) => x.tableNumber != booking.tableNumber
        );
    }

    const sortedTables = availFittingTables.sort(
        (a, b) => a.maxGroupSize - b.maxGroupSize
    );

    const tableNumber = sortedTables[0] ? sortedTables[0].tableNumber : -1;

    req.body.tableNumber = tableNumber;

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

// Update endpoint
router.patch("/booking", (req, res, next) => {
    console.log("API: patch endpoint reached", req.body);
    // booking id is in the query string, to match the GET format
    // take the req.body and put it in the matching Booking
    Booking.findOneAndUpdate(
        { _id: req.query.id },
        {
            $set: {
                customerInfo: {
                    name: req.body.customerInfo.name,
                    email: req.body.customerInfo.email,
                    contactNo: req.body.customerInfo.contactNo,
                },
                groupSize: req.body.groupSize,
                specialRequests: req.body.specialRequests,
                date: req.body.date,
                hoursBooked: req.body.hoursBooked,
                restaurantName: req.body.restaurantName,
            },
        },
        { returnDocument: "after" },
        (err, doc) => {
            if (err) {
                console.log("ERROR: ", err.message);
                res.status(500).send(err);
            } else {
                console.log(`Updated: ${doc}`);
                res.json(doc);
            }
        }
    );
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
            res.json({
                message: "Warning: Booking is already deleted, no changes made",
            });
        } else {
            doc.deletedFlag = true;
            const savedDoc = await doc.save();
            res.json(savedDoc);
        }
    } catch (err) {
        res.json(err);
    }
});

//////////////////////////////////////////
// EXPORT
//////////////////////////////////////////

module.exports = router;
