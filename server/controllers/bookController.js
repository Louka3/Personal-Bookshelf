const path = require('path');

const models = require('../models/bookModels');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `bookController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in bookController.${method}. Check server logs for more details.` }
  };
};

const bookController = {};
// add a book to the database
bookController.createBook = (req, res, next) => {
  if(!req.body){
    next(createErr({
      method: 'createBook',
      type: 'Failed to get data in req.body from bookController.createBook',
      message: {err: 'bookController.createBook: ERROR: Incorrect data received'} 
    }))
  }
  const {userId, title, author, totalPageCount, finished, rating} = req.body;
  res.locals.newBook = {
    userId: userId,
    title: title,
    author: author,
    totalPageCount: totalPageCount,
    finished: finished,
    rating: rating
  }
  next();
}




module.exports = bookController;