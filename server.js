require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname, "public")));

//////////////////////////////////////////
// ENDPOINTS
//////////////////////////////////////////

app.get("/api/checkAvailable", (req, res) => {
    console.log("route reached");
    res.json({ payload: "hello world!" });
});

// Expected Request is something like
//      {{server}}/api/booking?id=12345
app.get("/api/booking", (req, res, next) => {
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

    // success
    res.send(`You sent in: ${req.query.id}`);
});

// Expected Request Body: (same as a "booking" object in schema)
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

app.post("/api/booking", (req, res) => {
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

app.patch("/api/booking", (req, res) => {
    console.log("route reached");
    res.json({ payload: "hello world!" });
});

app.delete("/api/booking", (req, res) => {
    // find the booking, set deletedFlag = true
    console.log("route reached");
    res.json({ payload: "hello world!" });
});

//////////////////////////////////////////
// START SERVER
//////////////////////////////////////////

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
