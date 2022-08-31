const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    telco: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true,
    },
    codeId: {
        type: String,
        require: true,
    },
    serial: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('Card', cardSchema)