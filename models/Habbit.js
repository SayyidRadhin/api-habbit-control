const mongoose = require("mongoose")

const habbitSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      reminderTime: {
        type: String,
        required: true,
      },
})


// Pre-save hook to capitalize the 'name' field
habbitSchema.pre('save', function (next) {
    if (this.isModified('name')) {
      this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
    next();
  });


  module.exports = habbitSchema
