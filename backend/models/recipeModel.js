const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        duration: { type: Number, required: true },
        // ingredients: [{ type: String }],
        instructions: [{ type: String, required: true }],
        rating: { type: Number, default: 0 },
        image: { type: String },
        // category: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Category'
        // },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        isPublic: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema, "Recipes");
module.exports = Recipe;