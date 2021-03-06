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
        operatingHours: [[Number]], // should be a 7x?? array
        tables: [{ tableNumber: Number, maxGroupSize: Number }],
    },
    { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
