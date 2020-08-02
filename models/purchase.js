var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PurchaseSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    description: {
        type: mongoose.Schema.Types.String
    },
    discount: {
        type: mongoose.Schema.Types.String
    },
    total: {
        type: mongoose.Schema.Types.String
    },
    is_paid: {
        type: mongoose.Schema.Types.Boolean
    },
    items: {
        type: mongoose.Schema.Types.Array
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Purchase', PurchaseSchema);