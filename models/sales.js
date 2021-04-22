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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    total: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    //cash or card
    method: {
        type: mongoose.Schema.Types.String,
        default:"Card",
        required: true
    },
    items: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})


RecieptSchema.plugin(autoIncrement.plugin, { model: 'Reciept', field: 'invoice_number' });
module.exports = mongoose.model('Reciept', RecieptSchema);