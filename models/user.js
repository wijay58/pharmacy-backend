var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
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
    firstname: {
        type: mongoose.Schema.Types.String
    },
    lastname: {
        type: mongoose.Schema.Types.String
    },
    address: {
        type: mongoose.Schema.Types.String
    },
    user_type: {
        type: mongoose.Schema.Types.Number,
        default: 0
        // 0=employee 1=admin
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);