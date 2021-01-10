const responseSender = require('../../helpers/response-sender');

const registerHandlerPost = async (req, res) => {
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

    responseSender(res, 200, 'OK');
};

module.exports = registerHandlerPost;
