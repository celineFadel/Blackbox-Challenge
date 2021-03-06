let fse = require("fs-extra");
let path = require("path");
let multer = require("multer");

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

module.exports.correctFilePath = (s) => {
  let arr = s.split("uploads");
  arr[1] = arr[1].split("\\");
  if (arr[1].length > 1) {
    arr[1] = arr[1].join("/");
    s = "/uploads" + arr[1]; //FOR WINDOWS VIRSION
  } else {
    arr[1] = arr[1][0];
    s = "/uploads" + arr[1]; //FOR UBUNTU VERSION
  }

  return s;
};

module.exports.uploadFile = (obj = {}) => {
    let fieldName = obj.fieldName;

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            //cb for callback
            cb(null, path.join(__dirname, "../uploads")); //cb(err,dest)
        },
        filename: function (req, file, cb) {
            //cb for callback
            let date = new Date().toString();
            date = date.split(" ");
            let temp = date[4].split(":");
            date[4] = temp[0] + "-" + temp[1] + "-" + temp[2];
            let time = new Date().getTime();

            fse.mkdirpSync(
                path.join(
                __dirname,
                "../uploads/" + date[3] + "/" + date[1] + "/" + date[2]
                )
            );

            cb(
                null,
                date[3] +
                "/" +
                date[1] +
                "/" +
                date[2] +
                "/" +
                time +
                path.extname(file.originalname)
            ); //cb(err,filename)
        },
    });

    const fileFilter = (req, file, cb) => {
        //reject a file
        if (file.mimetype === "video/mp4") {
            cb(null, true);
        }    
        else {
            cb(null, false);
        }
    };

    //What we must return:
    let upload = multer({
        storage: storage,
        // fileFilter: fileFilter,
    });

    return upload;
};

module.exports.trimFile = (video_path) => {
    video_path = "../" + video_path;
    let trim_path = video_path.replace("uploads","trim");
    let temp = trim_path.substring(0, trim_path.lastIndexOf("/"));
    fse.mkdirpSync(
        path.join(
        __dirname,
        temp
        )
    );

    ffmpeg(path.join(__dirname, video_path))
  .setStartTime('00:00:00')
  .setDuration('2')
  .output(path.join(__dirname, trim_path))
  .on('end', function(err) {
    if(!err) { console.log('conversion Done') }
  })
  .on('error', function(err){
    console.log('error: ', err)
  }).run()
  return trim_path.substring(3);
}