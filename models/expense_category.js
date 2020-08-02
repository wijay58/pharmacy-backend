var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ExpenseCategorySchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: mongoose.Schema.Types.String
    }
})

module.exports = mongoose.model('ExpenseCategory', ExpenseCategorySchema);