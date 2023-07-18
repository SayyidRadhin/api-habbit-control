const mongoose = require('mongoose');

const completionSchema = new mongoose.Schema({
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true,
  },
  path: {
    type:String
  },
  date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Completion', completionSchema);