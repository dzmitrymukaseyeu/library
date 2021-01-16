const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const booksHandlerGet = async (req, res) => {
    const genre = req.query.genre;
    const title = req.query.title;

  //   if (
  //     !genre
  //     || !title
  //     || !Object.keys(req.query).length
  // ) {
  //     return responseSender(res, 422, 'You\'ve missed something important...');
  // }

    try {
      const books = await Books.find().select('-__v');
      responseSender(res, 200, 'Got it!', books);
    } catch (err) {
      responseSender(err, 500, err.message);
    }


};

module.exports = booksHandlerGet;
