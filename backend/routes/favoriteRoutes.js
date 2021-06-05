const express = require('express');
const router = express.Router();
const { isAuth, jsonResponse } = require('../utils');

const Recipe = require('../models/recipeModel');
const Favorite = require('../models/favoriteModel');

// @desc    get all favorite recipes
// @route   GET /api/favorite/
router.get('/', isAuth, async (req, res) => {
    try {
        const recipes = await Favorite.find({ user: req.id }).select("recipe -_id").populate("recipe");
        if (recipes.length>0) {
            const recipesOnly = recipes.map((recipe)=>{
                return recipe.recipe;
            });
            res.status(201).json(jsonResponse(recipesOnly, "Recipes retreival successful"));
        }
        else {
            res.status(201).json(jsonResponse(null, "No recipes found"));
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

// @desc    get recipe from favorites by id
// @route   GET /api/favorite/:id
router.get('/:id', isAuth, async (req, res) => {
    try {
        const favoriteRecipe = await Favorite.findOne({ recipe: req.params.id, user: req.id });
        if (favoriteRecipe) {
            res.status(201).json(jsonResponse(favoriteRecipe, "Recipe in favorites"));
        }
        else {
            res.status(201).json(jsonResponse(null, "Recipe not in favorites"));
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

// @desc    add recipe to favorites by id
// @route   POST /api/favorite/:id
router.post('/:id', isAuth, async (req, res) => {
    try {
        const exists = await Favorite.findOne({ recipe: req.params.id, user: req.id });
        if (exists) {
            res.status(201).json(jsonResponse(null, "Recipe already in favorites"));
        }
        else {
            const recipe = await Recipe.findById(req.params.id);
            if (recipe) {
                const favoriteRecipe = new Favorite(
                    {
                        user: req.id,
                        recipe: req.params.id,
                    }
                );
                const savedRecipe = await favoriteRecipe.save();
                res.status(201).json(jsonResponse(savedRecipe, "Recipe added to favorites successfully"));
            }
            else {
                res.status(201).json(jsonResponse(null, "Recipe not found"));
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

// @desc    delete recipe from favorites by id
// @route   DELETE /api/favorite/:id
router.delete('/:id', isAuth, async (req, res) => {
    try {
        const favoriteRecipe = await Favorite.findOne({ recipe: req.params.id, user: req.id });
        if (favoriteRecipe) {
            await favoriteRecipe.remove();
            res.status(201).json(jsonResponse(favoriteRecipe, "Recipe removed from favorites"));
        }
        else {
            res.status(201).json(jsonResponse(null, "Recipe not in favorites"));
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

module.exports = router;