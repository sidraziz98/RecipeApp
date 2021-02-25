const mongoose = require('mongoose');

const userRecipeRelationSchema = new mongoose.Schema(
    {
        relationType: { type: String },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
        },
    }
);

const UserRecipeRelation = mongoose.model("UserRecipeRelation", userRecipeRelationSchema, "UserRecipeRelations");
module.exports = UserRecipeRelation;