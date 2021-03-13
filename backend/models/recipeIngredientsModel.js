const mongoose = require('mongoose');

const recipeIngredientSchema = new mongoose.Schema(
    {
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
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

const RecipeIngredients = mongoose.model("RecipeIngredient", recipeIngredientSchema, "RecipeIngredients");
module.exports = RecipeIngredients;