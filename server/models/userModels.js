const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://LouisKuz:UhiFzo11tvFpP6S8@user-data.zvizyxz.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'user_data'
})
  .then(() => console.log('Connected to Mongo DB user-data.'))
  .catch(err => console.log(err));


const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
});

const User = mongoose.model('user', userSchema);

module.exports = {
  User
};