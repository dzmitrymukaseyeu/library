const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const bookHandlerPost = async (req, res) => {
  if (!req.body) {
    responseSender(err, 422, 'You\'ve missed something important...');
  }

  const book = new Books(req.body);

  try {
    await book.save();
    responseSender(res, 200, 'Book has been created!', book);
  } catch (err) {
    responseSender(err, 500, err.message);
  }

};

module.exports = bookHandlerPost;
