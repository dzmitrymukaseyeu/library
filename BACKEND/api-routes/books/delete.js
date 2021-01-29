const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const booksHandlerDelete = async (req, res) => {
  if (!req.query.id) {
    responseSender(err, 422, 'You\'ve missed something important...');
  }

  try {
    await Books.findByIdAndDelete({_id: req.query.id});

    responseSender(res, 200, 'Book has been deleted!');
  } catch (err) {
    responseSender(err, 500, err.message);
  }
};

module.exports = booksHandlerDelete;
