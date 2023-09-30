const path = require('path');
const mongoose = require('mongoose');

const models = require('../models/userModels');
// const User = require('../models/userModels');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `userController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in userController.${method}. Check server logs for more details.` }
  };
};

const userController = {};

userController.checkUser = async (req, res, next) => {
  console.log('logged')
  const {username, password} = req.params;
  // const username = req.params.username;
  // const password = req.params.password;
  console.log('hit checkUser')
  const exist = await models.User.findOne({
    username: username,
    password: password
  });
  res.locals.found = true;
  res.locals._id = exist._id;
  next();
}


userController.createUser = async (req, res, next) => {
  if (!req.body.newUser) {
    return next(createErr({
      method: 'createUser',
      type: 'incorrect info on req.body.newUser',
      err: 'incorrect info on req.body',
    }));
  }
  const {username, password } = req.body.newUser;
  try {
    const savedUser = await models.User.create({
      username: username,
      password: password
    });
    console.log('New User was saved:\n', savedUser);
    res.locals.savedUser = savedUser;
    const exist = await models.User.findOne({
      username: username,
      password: password
    });
    res.locals._id = exist._id;
    next(); 
  } catch (err) {
    next(createErr({
      method: 'createUser',
      type: 'writing to db for createUser',
      err: 'trouble saving newUser to database',
    }));
  }
}

module.exports = userController;