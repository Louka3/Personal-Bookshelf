const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;
app.use(express.json());
// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));


// handle parsing request body
app.use(express.json());

// require routers
const apiRouter = require('./routes/api');
const bookRouter = require('./routes/book')


app.use('/api/book', bookRouter);
app.use('/api', apiRouter);


// serve index.html on the route '/'
app.use('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});


// catch-all route handler for any requests to an unknown route
app.use((req, res) => {
  console.log('Catch all cause route is unknown')
  res.status(404).send('Route not Found');
});

// express global error handler 
app.use((err, req, res, next) => {
  const defaultErr = {
    log : 'Express error handler caught unknown middleware error in server.js',
    status: 400,
    message: { err: 'An error occurred'} 
  };
  const errorObj = Object.assign(defaultErr, err);
  console.error(errorObj.log);
  return res.status(errorObj.status || 500).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});