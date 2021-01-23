const Books = require('../../database/models/Books');
const responseSender = require('../../helpers/response-sender');

const booksHandlerDelete = async (req, res) => {
    const books = await Books.findByIdAndDelete({_id: req.query.id}, function (err, docs) {
      if (err){
      responseSender(err, 500, err.message);
      }
      else{
      responseSender(res, 200, 'Got it!');
      }
    })
};

module.exports = booksHandlerDelete;
