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
        res.status(400).send("Error. No reservation ID provided.");
        next();
        return;
    }

    // success
    res.send(`You sent in: ${req.query.id}`);
});

app.post("/api/booking", (req, res) => {
    console.log("route reached");
    res.json({ payload: "hello world!" });
});

app.patch("/api/booking", (req, res) => {
    console.log("route reached");
    res.json({ payload: "hello world!" });
});

app.delete("/api/booking", (req, res) => {
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
