require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// EJS
app.set("view engine", "ejs");

// body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname, "public")));

//////////////////////////////////////////
// ROUTES
//////////////////////////////////////////

app.get("/", (req, res) => {
    res.render("index.ejs");
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
