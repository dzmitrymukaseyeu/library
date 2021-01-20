const responseSender = require('../../helpers/response-sender');

const booksHandlerDelete = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    responseSender(res, 200, 'Got it!');
};

module.exports = booksHandlerDelete;
