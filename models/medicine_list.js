var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

let MedicineListSchema = new Schema({
    list: {
        type: Array
    },
    total: {
        type: mongoose.Schema.Types.Number
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    online_order_number: {
        type: mongoose.Schema.Types.Number
    },
    //store only the url of the image
    prescription: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    remark: {
        type: mongoose.Schema.Types.String,
    },
    customer_order_notes: {
        type: mongoose.Schema.Types.String,
    },
    stage: {
        type: mongoose.Schema.Types.String,
        default:"1", //1-customerSent 2-reserved 3-paid 4-rejected
        required: true
    },
    address: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    postalcode: {
        type: mongoose.Schema.Types.String
    },
}, {
    timestamps: true
})

MedicineListSchema.plugin(autoIncrement.plugin, { model: 'MedicineList', field: 'online_order_number' });
module.exports = mongoose.model('MedicineList', MedicineListSchema);