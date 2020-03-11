import mongoose from 'mongoose';
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

export default mongoose.model('Feedback', schema);
