var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const User = require('../models/user');
var bcrypt = require('bcryptjs');

var mongoDB = `mongodb://localhost:27017/pharmacy?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false`;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Database connection successful');
})
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

var db = mongoose.connection;
autoIncrement.initialize(db);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const seedDb = async () => {
  let hashedPassword = await bcrypt.hash('Supun@123', 10);
  const rootUser = {
    user_type: 1,
    firstname: 'Supun',
    lastname: 'Wijemanna',
    email: 'supun.wijemanna58@gmail.com',
    phone: '0716533631',
    dob: '1996-02-28',
    address: '200/1,1st Lane,Egodawatte Road,Boralesgamuwa.',
    joined_date: '2023-01-25',
    password: hashedPassword,
    nic: '960257896V'
  }
  
  await User.deleteMany({});
  await User.create(rootUser);
}

seedDb()