const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const booksHandlerGet = async (req, res) => {
  const genre = req.query.genre;
  const title = req.query.title;
  let params = {};

  if (Object.keys(params).length) {
    params = {
      genre,
      title
    }
  }

  try {
    const books = await Books.find(params).select('-__v');

    responseSender(res, 200, 'Got it!', books);
  } catch (err) {
    responseSender(err, 500, err.message);
  }
};

module.exports = booksHandlerGet;
