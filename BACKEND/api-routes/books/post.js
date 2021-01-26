const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const bookHandlerPost = async (req, res) => {
  let bookInfo = req.body;

  try {
    const book = await Book.save(bookInfo);

    responseSender(res, 200, 'Book has been updated!', book);
  } catch (err) {
    responseSender(err, 500, err.message);
  }
};

module.exports = bookHandlerPost;
