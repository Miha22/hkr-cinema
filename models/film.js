//const { default: strictTransportSecurity } = require('helmet/dist/middlewares/strict-transport-security');
const { Schema, model } = require('mongoose');

const filmschema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    trailer: {
        type: String
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = model('Film', filmschema);