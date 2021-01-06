var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },
    phone: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    firstname: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    lastname: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    loyalty_points: {
        type: mongoose.Schema.Types.Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Customer', CustomerSchema);