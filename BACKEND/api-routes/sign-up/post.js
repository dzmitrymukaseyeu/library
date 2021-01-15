const responseSender = require('../../helpers/response-sender');
const User = require('../../database/models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;



const signUpHandlerPost = async (req, res) => {
    const userToSave = req.body;

    if (
        !userToSave.firstName
        || !userToSave.lastName
        || !userToSave.email
        || !userToSave.password
        || Object.keys(userToSave).length !== 4
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    userToSave.password = bcrypt.hashSync(userToSave.password, saltRounds);

    let user = new User({
      firstName: userToSave.firstName,
      lastName: userToSave.lastName,
      email: userToSave.email,
      password: userToSave.password,
    })

    try {
      await user.save();
      responseSender(res, 200, 'OK');
    } catch (err) {
      responseSender(err, 500, err.message);
    }
};

module.exports = signUpHandlerPost;
