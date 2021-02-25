const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
    {
        rating: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
        },
    }
);

const Rating = mongoose.model("Rating", ratingSchema, "Ratings");
module.exports = Rating;