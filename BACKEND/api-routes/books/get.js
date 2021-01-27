const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const booksHandlerGet = async (req, res) => {
  let params = {};

  if (Object.keys(req.query).length) {

    if (req.query.title) {
      params['title'] = {
        '$regex': req.query.title,
        '$options': '-i'
      }
    }

    if (req.query.genre && req.query.genre !== 'null') {
      params['genre'] = req.query.genre
    }
  }

  console.log(params);
  try {
    // const books = await Books.find({'title': {'$regex': params.title}})
    const books = await Books.find(params).select('-__v');

    console.log(books);

    responseSender(res, 200, 'Got it!', books);
  } catch (err) {
    responseSender(err, 500, err.message);
  }
};

module.exports = booksHandlerGet;
