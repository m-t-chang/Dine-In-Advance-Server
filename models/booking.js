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
        date: String, // ISO date like 2022-12-25
        hoursBooked: [Number],
        restaurantName: { type: String, required: true },
        tableNumber: Number,
        deletedFlag: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
