import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
  company: {
    type: String
  },
  information: {
    type: String
  }
});

export default mongoose.model('Customer', schema);
