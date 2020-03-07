const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  appGrade: {
    type: Number,
    required: true
  },
  uiGrade: {
    type: Number,
    required: true
  },
  textFeedback: {
    type: String
  }
});

module.exports = mongoose.model('Feedback', schema);
