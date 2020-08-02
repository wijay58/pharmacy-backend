var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GenericSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: mongoose.Schema.Types.String
    },
    description: {
        type: mongoose.Schema.Types.String
    }
})

module.exports = mongoose.model('Genericdrug', GenericSchema);