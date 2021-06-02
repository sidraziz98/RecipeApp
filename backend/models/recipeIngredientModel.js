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
        amount: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const RecipeIngredient = mongoose.model("RecipeIngredient", recipeIngredientSchema, "RecipeIngredients");
module.exports = RecipeIngredient;