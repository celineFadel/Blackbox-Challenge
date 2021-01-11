const mongoose = require("./connect.js");

let videoSchema = new mongoose.Schema({
  thumbnailPath: {
    type: String,
    required: false,
  },
  videoPath: {
    type: String,
    required: true,
  },
  trimmedVideo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports.Video = new mongoose.model("Video", videoSchema);
