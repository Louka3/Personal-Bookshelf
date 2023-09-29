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

const bookSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // this is to link the book to the user
  title: {type: String, required: true},
  author: {type: String, required: true},
  totalPageCount: {type: Number, required: true},
  finished: {type: String, required: true},
  rating: {type: Number, required: true}
});

// this next statement ensures the collection is called as 'book' (singular) instead
// of mongoose automatically pluralizing it
// const Book = mongoose.model('Book', bookSchema, 'book');

const Book = mongoose.model('book', bookSchema);

module.exports = {
  Book
};