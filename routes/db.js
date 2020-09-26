var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var mongoDB = `mongodb://localhost:27017/pharmacy?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false`;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Database connection successful');
})
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

var db = mongoose.connection;
autoIncrement.initialize(db);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));