const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feature'
    }
  ],
  price: {
    type: Number,
    required: true
  },
  participants: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Project', schema);
