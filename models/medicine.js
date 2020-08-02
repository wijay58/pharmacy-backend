var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MedicineSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Medicine', MedicineSchema);