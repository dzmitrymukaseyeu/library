const Books = require('../../database/modals/Books');
const responseSender = require('../../helpers/response-sender');

const booksHandlerGet = async (req, res) => {
    const id = req.query.id;
    const genre = req.query.genre;
    const title = req.query.title;

    if (id) {
      // const book = events.find(evt => evt.book === book);
      return book
          ? responseSender(res, 200, 'Got it!', book)
          : responseSender(res, 404, 'Event not found!');
    }

    if (genre) {
      // const genre = events.find(evt => evt.genre === genre);
      return genre
          ? responseSender(res, 200, 'Got it!', genre)
          : responseSender(res, 404, 'Event not found!');
    }

    if (title) {
      // const title = events.find(evt => evt.title === title);
      return title
          ? responseSender(res, 200, 'Got it!', title)
          : responseSender(res, 404, 'Event not found!');
    }
    const books = await Books.find({});
    console.log(books);
    responseSender(res, 200, 'Got it!', books);
};

module.exports = booksHandlerGet;
