const mongoose = require('mongoose');

const recipeCategorySchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
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

const RecipeCategories = mongoose.model("RecipeCategory", recipeCategorySchema, "RecipeCategories");
module.exports = RecipeCategories;