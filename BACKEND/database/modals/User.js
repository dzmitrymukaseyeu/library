const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessType: {
    type: Number,
    min: 1,
    max: 3,
    default: 1,
    required: true
  },
  favoriteBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Books'
  }]
});

mongoose.model('User', UserSchema)
