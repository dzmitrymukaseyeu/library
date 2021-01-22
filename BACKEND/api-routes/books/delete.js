const { isValidObjectId } = require('mongoose');
const responseSender = require('../../helpers/response-sender');

const booksHandlerDelete = async (req, res) => {
    // console.log(req.query.id);

    // const books = await Books.find({_id:isValidObjectId("60070599a1733a83959df528")}).select('-__v');

  //   const books = await Books.find(req.query.id, function (err, docs) {
  //     if (err){
  //         console.log(err)
  //     }
  //     else{
  //       responseSender(res, 200, 'Got it!');
  //     }
  // });
  console.log(books);
  responseSender(res, 200, 'Got it!', books);
    // if (!id) {
    //     return responseSender(res, 422, 'You\'ve missed something important...');
    // }

    // responseSender(res, 200, 'Got it!');
};

module.exports = booksHandlerDelete;
