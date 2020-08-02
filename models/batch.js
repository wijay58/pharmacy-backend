var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BatchSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    bill_number: {
        type: mongoose.Schema.Types.String
    },
    name: {
        type: mongoose.Schema.Types.String
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Batch', BatchSchema);