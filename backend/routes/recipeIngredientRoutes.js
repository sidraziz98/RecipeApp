const express = require('express');
const router = express.Router();
const data = require('../data');
const { isAuth, jsonResponse } = require('../utils');

const RecipeIngredient = require('../models/recipeIngredientModel');

router.get('/', async (req, res) => {
    try {
        const recipeIngredients = await RecipeIngredient.find().select(" recipe ingredient amount").populate([{ path: 'recipe', select: 'title -_id' }, { path: 'ingredient', select: 'name -_id' }]);
        if (recipeIngredients) {
            res.status(201).json(jsonResponse(recipeIngredients, "Ingredients of recipes retreived successfully"));
        }
        else {
            res.status(201).json(jsonResponse(null, "No ingredients found"));
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

// @desc    Add ingredient to recipe
// @route   POST /api/recipeIngredient/add
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
            res.status(201).json(jsonResponse(null, "Incomplete details."))
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

// @desc    Update ingredient in recipe by Id
// @route   PUT /api/recipeIngredient/:id
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const recipeIngredient = await RecipeIngredient.findById(id);
        if (recipeIngredient) {
            const update = req.body;
            const updatedRecipeIngredient = await RecipeIngredient.findByIdAndUpdate(id, update, {
                useFindAndModify: false, new:true
            });
            res.status(201).json(jsonResponse(updatedRecipeIngredient, "Ingredient in recipe has been updated"));
        } else {
            res.status(201).json(jsonResponse(null, "Ingredient not found in the recipe"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

module.exports = router;