const mongoose = require("mongoose");

// MICHAEL: started writing a custom validation function for operatingHours, but decided it's not important rn
// function validateOperatingHour(hour) {
//     if (hour.isInteger() && hour >= 0 && hour <= 23) {
//         return;
//     }
//     return true;
// }

const restaurantSchema = new mongoose.Schema(
    {
        restaurantName: { type: String, required: true, unique: true },
        address: { type: String },
        operatingHours: { type: [[Number]] }, // should be a 7x?? array
        tables: [{ tableNumber: Number, maxGroupSize: Number }],
        bookings: [
            {
                tableNumber: Number,
                customerInfo: {
                    name: String,
                    email: String,
                    contactNo: String,
                },
                groupSize: Number,
                specialRequests: String,
                date: Number, //UTC time with date. other parts are ignored. Interpreted in SG time zone
                hoursBooked: [Number],
                deletedFlag: Boolean,
            },
        ],
    },
    { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
