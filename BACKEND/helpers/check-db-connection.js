const mongoose = require('mongoose');

const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    res.statusMessage = 'Connection to DB failed';

    return res.sendStatus(500);
  }

  next();
}

module.exports = checkDbConnection;



