const responseSender = require('../../helpers/response-sender');
const User = require('../../database/models/User');

const userHandlerGet = async (req, res) => {
    const userId = req.userId;

    if (!req.userId) {
      return responseSender(res, 401, 'Forbidden!');
    }

    try {
      const user = await User.findById(userId).select('-__v -password');

      responseSender(res, 200, 'Got it!', user);
    } catch (err) {
      responseSender(err, 500, err.message);
    }
};

module.exports = userHandlerGet;
