const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const booksHandlerPatch = async (req, res) => {
  const {id: _id, update} = req.body;

  if (
    !id
    || !update
    || Object.keys(req.body).length !== 2
  ) {
    return responseSender(res, 422, 'You\'ve missed something important...');
  }

  try {
    const book = await Books.findOneAndUpdate({_id}, update, {new: true});

    responseSender(res, 200, 'Book has been updated!', book);
  } catch (err) {
    responseSender(err, 500, err.message);
  }
};

module.exports = booksHandlerPatch;
