const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  announcement: String,
  area: String,
  message: String,
  contactPersonName: String,
  contactPersonPhone: String,
  importance: {
    type: String,
    default: "MODERATE",
  },
  createdAt: Date,
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
