const responseSender = require('../../helpers/response-sender');

const signInHandlerPost = async (req, res) => {
    const userToLogIn = req.body;

    if (
        !userToLogIn.email
        || !userToLogIn.password
        || Object.keys(userToLogIn).length !== 2
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    responseSender(res, 200, 'OK');
    console.log(req.body);
};

module.exports = signInHandlerPost;
