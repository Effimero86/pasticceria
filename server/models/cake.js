const mongoose = require('mongoose');

/**
 * {
 *  "ingredientName": "zucchero",
 *  "ingredientQuantity": "5",
 *  "unit": "g"
 * }
 */

const ingredientSchema = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: true
    },
    ingredientQuantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
});

/**
 * {
 *  "name": "Crostata",
 *  "ingredientList": [Ingredient]
 *  "baked": "2021-08-24",
 *  "quantity": 5,
 *  "sold": 0,
 *  "price": 24.5
 * }
 */

const cakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredientList: {
        type: [ingredientSchema],
        default: undefined
    },
    baked: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    }
});

const Cake = mongoose.model('cakes', cakeSchema);
module.exports = Cake;