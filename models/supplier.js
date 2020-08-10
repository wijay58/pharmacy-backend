var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SupplierSchema = new Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    phone: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    amount_to_be_paid: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Supplier', SupplierSchema);