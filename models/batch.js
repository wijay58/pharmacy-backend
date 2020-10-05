var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BatchSchema = new Schema({
    purchase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase',
        required: true
    },
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    expiry_date: {
        type: mongoose.Schema.Types.Date
    },
    bought_price: {
        type: mongoose.Schema.Types.String
    },
    selling_price: {
        type: mongoose.Schema.Types.String
    },
    remaining_quantity: {
        type: mongoose.Schema.Types.Number
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Batch', BatchSchema);