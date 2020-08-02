var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UnitSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: mongoose.Schema.Types.String
    },
    short_name: {
        type: mongoose.Schema.Types.String
    }
})

module.exports = mongoose.model('Unit', UnitSchema);