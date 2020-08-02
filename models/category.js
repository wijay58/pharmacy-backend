var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: mongoose.Schema.Types.String
    }
})

module.exports = mongoose.model('Category', CategorySchema);