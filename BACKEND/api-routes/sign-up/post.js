const responseSender = require('../../helpers/response-sender');
const User = require('../../database/models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signUpHandlerPost = async (req, res) => {
    const userToSave = req.body;
    userToSave.password = bcrypt.hashSync(userToSave.password, saltRounds);

    if (
        !userToSave.firstName
        || !userToSave.lastName
        || !userToSave.email
        || !userToSave.password
        || Object.keys(userToSave).length !== 4
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    const user = new User({
      firstName: userToSave.firstName,
      lastName: userToSave.lastName,
      email: userToSave.email,
      password: userToSave.password,
    })

    try {
      const isUserExist = await User.findOne({ email : userToSave.email});

      if (isUserExist) {
        return responseSender(res, 409, 'This email is already taken!');
      }

      await user.save();
      responseSender(res, 200, 'OK');
    } catch (err) {
      responseSender(err, 500, err.message);
    }
};

module.exports = signUpHandlerPost;
