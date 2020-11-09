var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MedicineListSchema = new Schema({
    list: {
        type: mongoose.Schema.Types.Array
    },
    total: {
        type: mongoose.Schema.Types.Number
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    not_available: {
        type: mongoose.Schema.Types.Array
    },
    //store only the url of the image
    prescription: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    stage: {
        type: mongoose.Schema.Types.String,
        default:"1", //1-customerSent 2-reserved 3-paid
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('MedicineList', MedicineListSchema);