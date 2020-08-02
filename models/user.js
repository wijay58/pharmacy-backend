var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
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
    username: {
        type: mongoose.Schema.Types.String
    },
    joined_date: {
        type: mongoose.Schema.Types.Date
    },
    dob: {
        type: mongoose.Schema.Types.Date
    },
    name: {
        type: mongoose.Schema.Types.String
    },
    address: {
        type: mongoose.Schema.Types.String
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);