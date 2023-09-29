// const fs = require('fs/promises');
// const fsCallback = require('fs');
// these I believe are specifically for when searching for data from another file
// not sure if they're needed yet

// const {response} = require('../server');
// const {create} = require('domain');
// not sure if these are needed yet. They were in the unit but I did not use them


const path = require('path');
const mongoose = require('mongoose');

const models = require('../models/bookModels');

// helper function to create dataController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `dataController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in dataController.${method}. Check server logs for more details.` }
  };
};

const dataController = {};

dataController.getBooks = (req, res, next) => {
  const id = req.params.userId
  models.Book.find({userId: id})
    .then((books) => {
      res.locals.bookList = books.map((book) => book)
      return next();
    })
    .catch((err) => {
      return next(createErr({
          method: 'getBooks',
          type: 'database query',
          err: {
            err: 'dataController.getBooks: ERROR: Check server logs for details.'
          }
        }))
    });
}


/*
  for this saveBook method, the express unit used this method for making new characters
  and updating characters, which I believe I can implement here as well with saving a book
  to the database
*/
dataController.saveBook = async (req, res, next) => {
  // check if the correct information is on res.locals
  if (!res.locals.newBook) {
    return next(createErr({
      method: 'saveBook',
      type: 'previous middleware error',
      err: 'incorrect info on res.locals',
    }));
  }
  if(res.locals.newBook){
    try {
      const savedBook = await models.Book.create(res.locals.newBook);
      console.log('New Book was saved:\n', savedBook);
      next(); 
    } catch (err) {
      next(createErr({
        method: 'saveBook',
        type: 'writing to db for newBook',
        err: 'trouble saving newBook to database',
      }));
    }
  }
};

dataController.updateBook = async (req, res, next) => {
  if(!req.body.updates){
    next(createErr({
      method: 'updateBook',
      type: 'getting info from req.body',
      err: 'trouble getting data from req.body',
    }));
  }
  try {
    const {title, author, totalPageCount, finished, rating} = req.body.updates;
    const updateFields = {};

    if(title !== undefined){
      updateFields.title = title;
    }

    if(author !== undefined){
      updateFields.author = author;
    }

    if(totalPageCount !== undefined){
      updateFields.totalPageCount = totalPageCount;
    }
    if(finished !== undefined){
      updateFields.pagesRead = pagesRead;
    }

    if(rating !== undefined){
      updateFields.rating = rating;
    }

    const updated = await models.Book.findOneAndUpdate(
      { _id: req.body.updates._id},
      { $set: updateFields },
      { new: true }
    );
    console.log('Book was updated:\n', updated);
    res.locals.updated = updated;
    next(); 
  } catch (err) {
    next(createErr({
      method: 'saveBook',
      type: 'writing to db for update',
      err: 'trouble updating with updatedBook',
    }));
  }
}

dataController.deleteBook = async (req, res, next) => {
  if(!req.body._id){
    return next(createErr({
      method: 'dataController.deleteBook',
      type: 'missing data on req.body',
      err: {
        err: 'Could not get the correct data off of the request body to delete a book.'
      }
    }))
  }
  

  try{
    const deleted = await models.Book.findOneAndDelete({
      // userId: req.body.userId, 
      // title: req.body.title
      _id: req.body._id
    });
    console.log(deleted);
    res.locals.deleted = deleted;
    next();
  }
  catch(err){
    next(createErr({
      method: 'dataController.deleteBook',
      type: 'trouble deleting book from Books database',
      err: {
        err: 'Could not delete the book with the specified info from the database'
      }
    }))
  }


}


module.exports = dataController;



