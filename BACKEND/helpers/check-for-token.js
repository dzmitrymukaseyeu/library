const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const checkForToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  const jwtKey = 'dev-jwt';

  if (authorization) {
    const token = authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, jwtKey);

      req['userId'] = decoded.userId;

    } catch(err) {
      if (err.message === 'invalid token') {
        return res.sendStatus(401);
      }

      if (err.message === 'jwt expired') {
        return res.sendStatus(401);
      }
    }
  }

  next();
}

module.exports = checkForToken;
