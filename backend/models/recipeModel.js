const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        duration: { type: String, required: true },
        ingredients: [{ type: String }],
        instructions: [{ type: String }],
        rating: { type: Number },
        isPublic: { type: Boolean },
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema, "Recipes");
module.exports = Recipe;