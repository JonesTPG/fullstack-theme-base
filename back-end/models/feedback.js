const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  type: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Feedback', schema);
