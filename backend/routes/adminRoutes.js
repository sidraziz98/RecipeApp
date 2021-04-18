const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const { isAuth, generateToken, jsonResponse } = require('../utils');

const Category = require('../models/categoryModel');
const Ingredient = require('../models/ingredientModel');

//create category
router.post('/category/create', async (req, res) => {
    try {
        if (req.body.category) {
            const categoryExist = await Category.findOne({ category: req.body.category });
            if (categoryExist) {
                res.status(201).json(jsonResponse(null, "Category already exists!"));
            } else {
                const category = new Category({
                    category: req.body.category
                });
                const newCategory = await category.save();
                console.log(newCategory);
                return res.status(201).json(jsonResponse(newCategory, "Category Created Successfully"));
            }
        } else {
            res.status(401).json(jsonResponse(null, "Incomplete details!"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//get categories
router.get('/category/', async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length > 0) {
            res.status(201).json(jsonResponse(categories, "Categories retreival successful"));
        }
        else {
            res.status(401).json(jsonResponse(null, "No categories found"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//delete category
router.delete('/category/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            await category.remove();
            res.status(401).json(jsonResponse(category, "Category removed"));
        } else {
            res.status(401).json(jsonResponse(null, "Category not found"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//create ingredient
router.post('/ingredient/create', async (req, res) => {
    try {
        if (req.body.ingredient) {
            const ingredientExist = await Ingredient.findOne({ ingredient: req.body.ingredient });
            if (ingredientExist) {
                res.status(201).json(jsonResponse(null, "Ingredient already exists!"));
            } else {
                const ingredient = new Ingredient({
                    ingredient: req.body.ingredient
                });
                const newIngredient = await ingredient.save();
                console.log(newIngredient);
                return res.status(201).json(jsonResponse(newIngredient, "Ingredient Created Successfully"));
            }
        } else {
            res.status(401).json(jsonResponse(null, "Incomplete details!"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//get ingredients
router.get('/ingredient/', async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        if (ingredients.length > 0) {
            res.status(201).json(jsonResponse(ingredients, "Ingredients retreival successful"));
        }
        else {
            res.status(401).json(jsonResponse(null, "No ingredients found"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//delete ingredient
router.delete('/ingredient/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);

        if (ingredient) {
            await ingredient.remove();
            res.status(401).json(jsonResponse(ingredient, "Ingredient removed"));
        } else {
            res.status(401).json(jsonResponse(null, "Ingredient not found"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

module.exports = router;