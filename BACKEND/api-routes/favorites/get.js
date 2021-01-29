const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const favoritesHandlerGet = async (req, res) => {
  const bookId = JSON.parse(req.query.favoriteBooks);

  if (!bookId) {
    responseSender(err, 422, 'You\'ve missed something important...');
  }

  try {
    const book = await Books.find({_id: bookId})
    responseSender(res, 200, 'Got it!', book);
  } catch (err) {
    responseSender(err, 500, err.message);
  }
};

module.exports = favoritesHandlerGet;
