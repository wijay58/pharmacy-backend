var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    }
})

module.exports = mongoose.model('Category', CategorySchema);