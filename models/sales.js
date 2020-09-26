var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

let RecieptSchema = new Schema({
    invoice_number: {
        type: mongoose.Schema.Types.Number
    },
    date: {
        type: mongoose.Schema.Types.Date,
        default: Date.now(),
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    total: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    items: {
        type: mongoose.Schema.Types.Array,
        required: true
    }
}, {
    timestamps: true
})

RecieptSchema.plugin(autoIncrement.plugin, { model: 'Reciept', field: 'invoice_number' });
module.exports = mongoose.model('Reciept', RecieptSchema);