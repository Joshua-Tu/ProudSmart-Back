const { Schema } = require("mongoose");

const PurchasedCoursesSchema = new Schema({
  courseId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  courseProfilePictureUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = PurchasedCoursesSchema;