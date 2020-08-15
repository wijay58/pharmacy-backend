var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PurchaseSchema = new Schema({
    description: {
        type: mongoose.Schema.Types.String
    },
    date: {
        type: mongoose.Schema.Types.Date
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    bill_number: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    total: {
        type: mongoose.Schema.Types.Number
    },
    paid_amount: {
        type: mongoose.Schema.Types.Number
    },
    is_due: {
        type: mongoose.Schema.Types.Boolean
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Purchase', PurchaseSchema);