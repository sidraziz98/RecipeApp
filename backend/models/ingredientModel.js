const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
    { ingredient: String }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema, "Ingredients");
module.exports = Ingredient;