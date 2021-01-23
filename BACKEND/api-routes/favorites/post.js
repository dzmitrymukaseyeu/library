const User = require('../../database/models/User');
const responseSender = require('../../helpers/response-sender');

const favoritesHandlerPost = async (req, res) => {
  const updateOptions = req.body.state
    ? {$pull:{favoriteBooks: req.body.id}}
    : {$addToSet:{favoriteBooks: req.body.id}};

  try {
    const user = await User.findOneAndUpdate({_id: req.userId}, updateOptions, {new: true})
    console.log(user);
    responseSender(res, 200, 'Liked!', user);
  } catch (err) {
    responseSender(err, 500, err.message);
  }
};

module.exports = favoritesHandlerPost;
