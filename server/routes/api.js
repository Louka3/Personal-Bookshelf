const express = require('express');

const dataController = require('../controllers/dataController.js')

const router = express.Router();


// will be used to get all books from a specific userId
router.get('/:userId', 
  dataController.getBooks,
  (req, res) => res.status(200).json({books: res.locals.bookList})
);


module.exports = router;