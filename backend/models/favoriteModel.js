const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
        },
    },
    {
        timestamps: true,
    }
);

const Favorite = mongoose.model("Favorite", favoriteSchema, "Favorites");
module.exports = Favorite;