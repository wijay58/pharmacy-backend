var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecieptSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    invoice_number: {
        type: mongoose.Schema.Types.String
    },
    balance: {
        type: mongoose.Schema.Types.String
    },
    discount: {
        type: mongoose.Schema.Types.String
    },
    total: {
        type: mongoose.Schema.Types.String
    },
    total_payable: {
        type: mongoose.Schema.Types.String
    },
    amound_paid: {
        type: mongoose.Schema.Types.String
    },
    items: {
        type: mongoose.Schema.Types.Array
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Reciept', RecieptSchema);