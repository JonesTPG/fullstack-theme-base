const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  roles: [
    {
      type: String
    }
  ],
  darkTheme: {
    type: Boolean,
    default: false
  },
  firstName: {
    type: String,
    minlength: 3
  },
  lastName: {
    type: String,
    minlength: 3
  },
  passwordHash: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
