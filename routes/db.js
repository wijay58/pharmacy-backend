var mongoose = require('mongoose');

var mongoDB = `mongodb://localhost:27017/pharmacy?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false`;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Database connection successful');
})
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));