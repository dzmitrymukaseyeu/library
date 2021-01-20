const responseSender = require('../../helpers/response-sender');
const bcrypt = require('bcrypt');
const User = require('../../database/models/User');
const jwt = require('jsonwebtoken');
const jwtKey = 'dev-jwt';

const signInHandlerPost = async (req, res) => {
    const userToLogIn = req.body;
    let user = null;

    if (
      !userToLogIn.email
      || !userToLogIn.password
      || Object.keys(userToLogIn).length !== 2
    ) {
      return responseSender(res, 422, 'You\'ve missed something important...');
    }

    try {
      user = await User.findOne({email: userToLogIn.email}).select('-__v');
    } catch(err) {
      return responseSender(err, 500, err.message);
    }

    if (!user) {
      return responseSender(res, 401, 'Authentication failed. User not found!');
    }

    const isPasswordTheSame = bcrypt.compareSync(userToLogIn.password, user.password);

    if (!isPasswordTheSame) {
      return responseSender(res, 401, 'Authentication failed. Wrong password!');
    }

    const accessToken = jwt.sign({userId: user._id}, jwtKey, {expiresIn: '1h'});
    const refreshToken = jwt.sign({userId: user._id}, jwtKey, {expiresIn: '10d'});

    delete user.password;

    responseSender(res, 200, 'OK', {
      user,
      token: {
        accessToken,
        refreshToken
      }
    });
};

module.exports = signInHandlerPost;
