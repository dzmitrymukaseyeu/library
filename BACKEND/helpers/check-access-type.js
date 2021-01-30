const User = require('../database/models/User');

const checkAccessType = async (req) => {
  const user = await User.findById(req.userId);

  return !!user && user.accessType === 3;
}

module.exports = checkAccessType;
