const express = require('express');
const router = express.Router();
const data = require('../data');
const { isAuth, jsonResponse } = require('../utils');

const Recipe = require('../models/recipeModel');
const RecipeIngredient = require('../models/recipeIngredientModel');

router.get('/seed/recipes', async (req, res) => {
    await Recipe.deleteMany({});
    data.recipes.forEach((element) => {
        element.createdBy = req.id;
    });
    const createdRecipes = await Recipe.insertMany(data.recipes);
    res.send({ createdRecipes });
});

//get all recipes (feed)
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate({ path: 'createdBy', select: 'firstName -_id' });
        if (recipes.length > 0) {
            res.status(201).json(jsonResponse(recipes, "Recipes retreival successful"));
        }
        else {
            res.status(401).json(jsonResponse(null, "No recipes found"));
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//get all my recipes
router.get('/myrecipes', isAuth, async (req, res) => {
    try {
        const recipes = await Recipe.find({createdBy: req.id}).populate({ path: 'createdBy', select: 'firstName -_id' });
        if (recipes.length > 0) {
            res.status(201).json(jsonResponse(recipes, "Recipes retreival successful"));
        }
        else {
            res.status(401).json(jsonResponse(null, "No recipes found"));
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//create recipe
router.post('/add', isAuth, async (req, res) => {
    try {
        if (req.body.title && req.body.duration && req.body.instructions) {
            const recipe = new Recipe(
                {
                    title: req.body.title,
                    duration: req.body.duration,
                    description: req.body.description,
                    instructions: req.body.instructions,
                    // image: NULL || req.file.path,
                    createdBy: req.id,
                    isPublic: req.body.isPublic
                }
            );
            const createdRecipe = await recipe.save();
            res.status(201).json(jsonResponse(createdRecipe, "Recipe created successfully"))
        }
        else {
            res.status(401).json(jsonResponse(null, "Incomplete recipe details."))
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('createdBy');
        if (recipe) {
            const ingredients = await RecipeIngredient.find({ userId: req.id });
            const sendRecipe = {
                _id: recipe._id,
                title: recipe.title,
                duration: recipe.duration,
                description: recipe.description,
                ingredients: ingredients,
                instructions: recipe.instructions,
                image: recipe.image,
                rating: recipe.rating,
                createdBy: recipe.createdBy.firstName + " " + recipe.createdBy.lastName,
                isPublic: recipe.isPublic
            };
            res.status(201).json(jsonResponse(sendRecipe, "Recipe retreival successful"));
        }
        else {
            res.status(401).send(jsonResponse(null, 'Recipe not found'));
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

// @desc    Update Recipe by Id
// @route   PUT /api/tag/:id
router.put('/:id', isAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const recipeUser = await Recipe.findById(id);
        if (req.id == recipeUser.createdBy) {
            const update = req.body;
            await Recipe.findByIdAndUpdate(id, update, {
                useFindAndModify: false,
            });
            const recipe = await Recipe.findById(id);
            res.status(201).json(jsonResponse(recipe, "Recipe has been updated"));
        } else {
            res.status(401).json(jsonResponse(null, "You do not have permission to update the recipe"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//delete Recipe
router.delete('/:id', isAuth, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (recipe) {
            if (recipe.createdBy == req.id) {
                await recipe.remove();
                res.status(201).json(jsonResponse(recipe, "Recipe removed"));
            } else{
                res.status(401).json(jsonResponse(null, "You do not have permission to delete the recipe"));
            }
        } else {
            res.status(401).json(jsonResponse(null, "Recipe not found"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

module.exports = router;