const express = require('express');

const bookController = require('../controllers/bookController.js');
const dataController = require('../controllers/dataController.js');

const router = express.Router();



router.post('/', 
  bookController.createBook,
  dataController.saveBook,
  (req, res) => {
    console.log('Book was created and saved.')
    return res.status(200).json(res.locals.newCharacter)
  }
)

router.patch('/',
  dataController.updateBook,
  (req,res) => {
    console.log('Book was updated.')
    return res.status(200).json(res.locals.updated)
  }
)

router.delete('/',
  dataController.deleteBook,
  (req,res) => {
    console.log('book was removed.')
    console.log(res.locals.deleted)
    return res.status(200).json(res.locals.deleted);
  }
)

module.exports = router;

// {
//   "updates" : {
//       "userId": "650e669a6fc15fbec77bb705",
//       "title": "Fellowship Of The Ring",
//       "pagesRead": 350
//   }
// }