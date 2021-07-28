const express = require('express');
const router = express.Router();
const { isAuth, jsonResponse } = require('../utils');

const Recipe = require('../models/recipeModel');
const Rating = require('../models/ratingModel');

// // @desc    get all ratings recipes
// // @route   GET /api/favorite/
// router.get('/', isAuth, async (req, res) => {
//     try {
//         const recipes = await Favorite.find({ user: req.id }).select("recipe -_id").populate("recipe");
//         if (recipes.length>0) {
//             res.status(201).json(jsonResponse(recipes, "Recipes retreival successful"));
//         }
//         else {
//             res.status(201).json(jsonResponse(null, "No recipes found"));
//         }
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json(jsonResponse(null, err.message));
//     }
// });

// @desc    get recipe from favorites by id
// @route   GET /api/favorite/:id
router.get('/:id', isAuth, async (req, res) => {
    try {
        const rating = await Rating.findOne({ recipe: req.params.id, user: req.id });
        if (rating) {
            res.status(201).json(jsonResponse(rating, "Recipe rated available"));
        }
        else {
            res.status(201).json(jsonResponse(null, "Recipe not rated"));
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

const updateRecipeRating = async (rating, id) => {
    try {
        const ratings = await Rating.find({ recipe: id });
        let total = 0;
        ratings.map((r) => {
            total += r.rating;
        });
        total = (total / ratings.length).toFixed(2);
        const update = { rating: total };
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, update, {
            useFindAndModify: false, new: true
        });
        return updatedRecipe;
    } catch (err) {
        console.log(err);
    }
};

// @desc    rate a recipe to by id
// @route   POST /api/rate/:id
router.post('/:id', isAuth, async (req, res) => {
    try {
        const rating = await Rating.findOne({ recipe: req.params.id, user: req.id });
        if (rating) {
            await Rating.findByIdAndUpdate(rating._id, { rating: req.body.rating }, {
                useFindAndModify: false,
            });
            const updatedRecipe = await updateRecipeRating(req.body.rating, req.params.id);
            if (updatedRecipe)
                res.status(201).json(jsonResponse(updatedRecipe, "Recipe rating updated"));
            else
                res.status(201).json(jsonResponse(null, "Recipe rating could not be updated"));
        }
        else {
            const recipe = await Recipe.findById(req.params.id);
            if (recipe) {
                const rateRecipe = new Rating(
                    {
                        user: req.id,
                        recipe: req.params.id,
                        rating: req.body.rating
                    }
                );
                await rateRecipe.save();
                const updatedRecipe = await updateRecipeRating(req.body.rating, req.params.id);
                if (updatedRecipe)
                    res.status(201).json(jsonResponse(updatedRecipe, "Recipe rated successfully"));
                else
                    res.status(201).json(jsonResponse(null, "Recipe could not be rated"));
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

module.exports = router;