const responseSender = require('../../helpers/response-sender');

const userHandlerGet = async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    responseSender(res, 200, 'Got it!', user);
    console.log('1');
};

module.exports = userHandlerGet;
