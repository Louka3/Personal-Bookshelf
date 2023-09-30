const express = require('express');

const userController = require('../controllers/userController')

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({message: "works"})
})

router.get('/:username/:password',
  userController.checkUser,
  (req, res) => {
    console.log('made it')
    return res.status(200).json({found: res.locals.found, _id: res.locals._id});
  }
)

router.post('/', 
  userController.createUser,
  (req, res) => {
    console.log('User was created and saved.')
    return res.status(200).json({savedUser: res.locals.savedUser, _id: res.locals._id})
  }
)


module.exports = router;
