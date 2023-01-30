var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SupplierSchema = new Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    phone: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    amount_to_be_paid: {
        type: mongoose.Schema.Types.Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Supplier', SupplierSchema);