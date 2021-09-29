const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    image: String,
    name:{
        type: String,
        required: [true, "Meal name cannot be empty!"],
        unique: true
    },
    description: String,
    price:{
        type: Number,
        required: [true, "Meal price cannot be empty!"]
    },
    cost:{
        type: Number,
        required: [true, "Meal cost cannot be empty"]
    },
    type:{
        type: String,
        required: [true, "Meal must be either a food or a drink"],
        maxLength: 1
    },
    menuType:{
        type: String,
        required: [true, "Menu type cannot be empty"],
        maxLength: 9
    }
});

mongoose.model("Meal", mealSchema);