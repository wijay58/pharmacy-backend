var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SupplierSchema = new Schema({
    email: {
        type: mongoose.Schema.Types.String
    },
    phone: {
        type: mongoose.Schema.Types.String
    },
    name: {
        type: mongoose.Schema.Types.String
    },
    amount_to_be_paid: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Supplier', SupplierSchema);