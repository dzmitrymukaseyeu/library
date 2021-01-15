const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const checkDbConnection = require('./BACKEND/helpers/check-db-connection');
const PORT = process.env.PORT || 5000;
const app = express();

const signUpHandlerPost = require('./BACKEND/api-routes/sign-up/post');
const signInHandlerPost = require('./BACKEND/api-routes/sign-in/post');
const refreshHandlerPost = require('./BACKEND/api-routes/refresh/post');
const userHandlerGet = require('./BACKEND/api-routes/user/get');
const booksHandlerGet = require('./BACKEND/api-routes/books/get');
const booksHandlerDelete = require('./BACKEND/api-routes/books/delete');
const booksHandlerPatch = require('./BACKEND/api-routes/books/patch');

const UserSchema = require('./BACKEND/database/models/User');
const BooksSchema = require('./BACKEND/database/models/Books');

mongoose
  .connect('mongodb+srv://dzmitry:D1mamukas1992@cluster0.kp1ka.mongodb.net/library?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDb connected')
  })
  .catch(err => console.log(err));


app.use(cors());
app.use(bodyParser.json());
app.use(checkDbConnection);

// Auth routes
app.post('/api/auth/sign-up', signUpHandlerPost);
app.post('/api/auth/sign-in', signInHandlerPost);
app.post('/api/auth/refresh', refreshHandlerPost);

// User routes
app.get('/api/user', userHandlerGet);

// Books routes
app.get('/api/books', booksHandlerGet);
app.delete('/api/books', booksHandlerDelete);
app.patch('/api/books', booksHandlerPatch);


app.listen(PORT, () =>
    console.log('Server is running on port ' + PORT)
);
