const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        duration: { type: String, required: true },
        // ingredients: [{ type: String }],
        instructions: [{ type: String }],
        rating: { type: Number, default: 0 },
        // category: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Category'
        // },
        isPublic: { type: Boolean },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema, "Recipes");
module.exports = Recipe;