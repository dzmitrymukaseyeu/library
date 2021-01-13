const responseSender = require('../../helpers/response-sender');

const booksHandlerPatch = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    if (title) {
      // const title = events.find(evt => evt.title === title);
      return title
          ? responseSender(res, 200, 'Got it!', title)
          : responseSender(res, 404, 'Event not found!');
    }

    if (author) {
      // const genre = events.find(evt => evt.genre === genre);
      return author
          ? responseSender(res, 200, 'Got it!', author)
          : responseSender(res, 404, 'Event not found!');
    }

    if (genre) {
      // const title = events.find(evt => evt.title === title);
      return genre
          ? responseSender(res, 200, 'Got it!', genre)
          : responseSender(res, 404, 'Event not found!');
    }

    if (published) {
      // const title = events.find(evt => evt.title === title);
      return published
          ? responseSender(res, 200, 'Got it!', published)
          : responseSender(res, 404, 'Event not found!');
    }

    if (description) {
      // const title = events.find(evt => evt.title === title);
      return description
          ? responseSender(res, 200, 'Got it!', description)
          : responseSender(res, 404, 'Event not found!');
    }

    if (link) {
      // const title = events.find(evt => evt.title === title);
      return link
          ? responseSender(res, 200, 'Got it!', link)
          : responseSender(res, 404, 'Event not found!');
    }

    responseSender(res, 200, 'Got it!');
    console.log('delete');
};

module.exports = booksHandlerPatch;
