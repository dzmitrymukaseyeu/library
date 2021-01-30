const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');
const checkAccessType = require('../../helpers/check-access-type');

const booksHandlerDelete = async (req, res) => {
  if (!req.query.id) {
    responseSender(err, 422, 'You\'ve missed something important...');
  }

  try {
    if (checkAccessType(req)) {
      await Books.findByIdAndDelete({_id: req.query.id});
      responseSender(res, 200, 'Book has been deleted!');
    } else {
      responseSender(res, 403, 'Forbidden!');
    }

  } catch (err) {
    responseSender(err, 500, err.message);
  }
};

module.exports = booksHandlerDelete;
