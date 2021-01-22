const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const booksHandlerPatch = async (req, res) => {
  try {
    const book = await Books.findOneAndUpdate(req.body.filter, req.body.update, {
      new: true
    });

    responseSender(res, 200, 'Got it!', book);
  } catch (error) {
    responseSender(err, 500, err.message);
  }
};

module.exports = booksHandlerPatch;
