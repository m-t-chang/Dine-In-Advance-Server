const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        customerInfo: {
            name: String,
            email: String,
            contactNo: String,
        },
        groupSize: Number,
        specialRequests: String,
        date: Number, //UTC time with date. other parts are ignored. Interpreted in SG time zone
        hoursBooked: [Number],
        restaurantName: { type: String, required: true },
        tableNumber: Number,
        deletedFlag: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
