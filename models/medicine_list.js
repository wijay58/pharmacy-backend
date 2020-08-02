var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MedicineListSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    list: {
        type: mongoose.Schema.Types.Array
    },
    total: {
        type: mongoose.Schema.Types.String
    },
    not_available: {
        type: mongoose.Schema.Types.Array
    },
    //store only the url of the image
    prescription: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('MedicineList', MedicineListSchema);