const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
    { name: { type: String, unique: true } }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema, "Ingredients");
module.exports = Ingredient;