const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  blurhash: {
    type: String
  },
  city: {
    type: String
  },
  currency: {
    type: String
  },
  delivery_price: {
    type: Number
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  location: [
    {
      type: String
    }
  ],
  online: {
    type: Boolean
  },
  tags: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model('Restaurant', schema);
