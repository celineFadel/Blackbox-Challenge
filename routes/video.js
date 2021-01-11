let express = require("express");
let { LogTime } = require("../functions/LogTime");

let {
    uploadVideo,
    // changeVideoThumbnail,
  } = require("../controllers/videoController");
  
  let { uploadFile } = require("../functions/functions");
  
  let router = express.Router();
    
  router.post(
    "/uploadVideo",
    LogTime.setStartMiddleware,
    uploadFile().fields([{ name: 'path', maxCount: 1 }, { name: 'thumbnail_path', maxCount: 1 }]),
    LogTime.setEndMiddleware,
    uploadVideo
  );
  
  module.exports = router;
