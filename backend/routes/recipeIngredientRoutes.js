const express = require('express');
const router = express.Router();
const data = require('../data');
const { isAuth, jsonResponse } = require('../utils');

const RecipeIngredient = require('../models/recipeIngredientModel');

// @desc    Add ingredient to recipe Recipe by Id
// @route   PUT /api/tag/:id
router.post('/add', async (req, res) => {
    try {
        if (req.body.recipe && req.body.ingredient) {
            const recipeIngredient = new RecipeIngredient(
                {
                    recipe: req.body.recipe,
                    ingredient: req.body.ingredient,
                }
            );
            const created = await recipeIngredient.save();
            
            const createdRecipeIngredient = await RecipeIngredient.findById(created._id).populate("recipe")
            res.status(201).json(jsonResponse(createdRecipeIngredient, "Recipe ingredient created successfully"))
        }
        else {
            res.status(401).json(jsonResponse(null, "Incomplete details."))
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

module.exports = router;