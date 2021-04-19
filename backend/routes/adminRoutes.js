const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const { isAuth, generateToken, jsonResponse } = require('../utils');

const Category = require('../models/categoryModel');
const Ingredient = require('../models/ingredientModel');
const User = require('../models/userModel');

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.id);
    if(user){
        if(user.userRole == 1){
            req.isAdmin = true;
            next();
        }else{
            res.status(401).send(jsonResponse(null, 'You do not have permission'));
        }
    }else{
        res.status(401).send(jsonResponse(null, 'User with this id does not exist'));
    }
};

router.get('/user/', isAuth, isAdmin, async (req, res) => {
    try{
        const users = await User.find();
        if (users.length > 0) {
            res.status(201).json(jsonResponse(users, "Users retreival successful"));
        }
        else {
            res.status(401).json(jsonResponse(null, "No users found"));
        }
    }catch(err){
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//create category
router.post('/category/create', isAuth, async (req, res) => {
    try {
        if (req.body.category) {
            const categoryExist = await Category.findOne({ category: req.body.category });
            if (categoryExist) {
                res.status(201).json(jsonResponse(null, "Category already exists"));
            } else {
                const category = new Category({
                    category: req.body.category
                });
                const newCategory = await category.save();
                return res.status(201).json(jsonResponse(newCategory, "Category Created Successfully"));
            }
        } else {
            res.status(401).json(jsonResponse(null, "Incomplete details"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//get category by id
router.get('/category/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.status(201).json(jsonResponse(category, "Category retreival successful"));
        }
        else {
            res.status(401).json(jsonResponse(null, "Category not found"));
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
router.delete('/category/:id', isAuth, isAdmin, async (req, res) => {
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
router.post('/ingredient/create', isAuth, async (req, res) => {
    try {
        if (req.body.ingredient) {
            const ingredientExist = await Ingredient.findOne({ ingredient: req.body.ingredient });
            if (ingredientExist) {
                res.status(201).json(jsonResponse(null, "Ingredient already exists"));
            } else {
                const ingredient = new Ingredient({
                    ingredient: req.body.ingredient
                });
                const newIngredient = await ingredient.save();
                return res.status(201).json(jsonResponse(newIngredient, "Ingredient Created Successfully"));
            }
        } else {
            res.status(401).json(jsonResponse(null, "Incomplete details"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(null, err.message));
    }
});

//get ingredient by id
router.get('/ingredient/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        if (ingredient) {
            res.status(201).json(jsonResponse(ingredient, "Ingredient retreival successful"));
        }
        else {
            res.status(401).json(jsonResponse(null, "Ingredient not found"));
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
router.delete('/ingredient/:id', isAuth, isAdmin, async (req, res) => {
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