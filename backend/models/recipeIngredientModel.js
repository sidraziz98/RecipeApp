const mongoose = require('mongoose');

const recipeIngredientSchema = new mongoose.Schema(
    {
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true
        },
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        },
        amount: {
            type: String, required: true
        }
    },
    {
        timestamps: true,
    }
);

const RecipeIngredient = mongoose.model("RecipeIngredient", recipeIngredientSchema, "RecipeIngredients");
module.exports = RecipeIngredient;