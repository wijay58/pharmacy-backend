var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    email: {
        type: mongoose.Schema.Types.String
    },
    phone: {
        type: mongoose.Schema.Types.String
    },
    password: {
        type: mongoose.Schema.Types.String
    },
    name: {
        type: mongoose.Schema.Types.String
    },
    type: {
        type: mongoose.Schema.Types.String
    },
    loyalty_points: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Customer', CustomerSchema);