const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const bookHandlerPost = async (req, res) => {
  const book = new Books(req.body);

  await book.save();
  responseSender(res, 200, 'Book has been created!', book);
};

module.exports = bookHandlerPost;
