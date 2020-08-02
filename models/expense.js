var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ExpenseSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    description: {
        type: mongoose.Schema.Types.String
    },
    total: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Expense', ExpenseSchema);