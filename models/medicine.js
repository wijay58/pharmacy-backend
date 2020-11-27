var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MedicineSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    size: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    generic_name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Medicine', MedicineSchema);