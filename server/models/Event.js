const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  event: String,
  date: String,
  from: String,
  to: String,
  image: {
    type: String,
    default:
      "https://thumbs.dreamstime.com/z/no-thumbnail-images-placeholder-forums-blogs-websites-148010338.jpg",
  },
  description: String,
  contactPersonName: String,
  contactPersonPhone: String,
  comments: [
    {
      name: String,
      comment: String,
      createdAt: Date,
    },
  ],
});

module.exports = mongoose.model("Event", EventSchema);
