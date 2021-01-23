const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const booksHandlerPatch = async (req, res) => {
  const {id: _id, update} = req.body;

  try {
    const book = await Books.findOneAndUpdate({_id}, update, {new: true});

    responseSender(res, 200, 'Book has been updated!', book);
  } catch (err) {
    responseSender(err, 500, err.message);
  }
};

module.exports = booksHandlerPatch;
