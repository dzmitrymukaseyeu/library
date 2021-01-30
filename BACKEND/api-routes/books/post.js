const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');
const checkAccessType = require('../../helpers/check-access-type');

const bookHandlerPost = async (req, res) => {
  if (!req.body) {
    responseSender(err, 422, 'You\'ve missed something important...');
  }

  const book = new Books(req.body);

  try {
    if (checkAccessType(req)) {
      await book.save();
      responseSender(res, 200, 'Book has been created!', book);
    } else {
      responseSender(res, 403, 'Forbidden!');
    }

  } catch (err) {
    responseSender(err, 500, err.message);
  }

};

module.exports = bookHandlerPost;
