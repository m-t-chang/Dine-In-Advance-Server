const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        location: { type: String },
        rating: { type: Number, max: 5 },
        vacancies: { type: Boolean },
        tags: [String],
        rooms: [
            {
                roomNumber: Number,
                size: String,
                price: Number,
                booked: Boolean,
            },
        ],
    },
    { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
