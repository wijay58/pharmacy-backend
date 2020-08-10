var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UnitSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    short_name: {
        type: mongoose.Schema.Types.String,
        required: true
    }
})

module.exports = mongoose.model('Unit', UnitSchema);