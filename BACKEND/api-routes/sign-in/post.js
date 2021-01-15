const responseSender = require('../../helpers/response-sender');
const User = require('../../database/models/User');

const signInHandlerPost = async (req, res) => {
    const userToLogIn = req.body;

    if (
        !userToLogIn.email
        || !userToLogIn.password
        || Object.keys(userToLogIn).length !== 2
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    try {
      const getUser = await User.findOne({email: userToLogIn.email, password: userToLogIn.password}).select('-__v');
      responseSender(res, 200, 'OK', getUser);
    } catch (err) {
      responseSender(err, 500, err.message);
    }

};

module.exports = signInHandlerPost;
