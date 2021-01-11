let { correctFilePath, trimFile } = require("../functions/functions");
let {LogTime} = require("../functions/LogTime");

let { Video } = require("../database/schemas");

module.exports.uploadVideo = async (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({
            error: true,
            message: "Video is missing",
        });
    }

    let video, video_obj;
    video_obj = {
        videoPath: correctFilePath(req.files['path'][0].path)
    };

    if(req.files['thumbnailPath']) {
        video_obj["thumbnailPath"] =  correctFilePath(req.files['thumbnailPath'][0].path);
    }
    
    try {
        let trimmedVideo = trimFile(video_obj.videoPath);
        video_obj["trimmedVideo"] = trimmedVideo;
        // console.log(video_obj);

        Video.create(video_obj)
        .then((data) => {
            console.log(data);

            return res.status(200).json({
                error: false,
                message: "Video uploaded!",
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "An error occured"
            });
        });
    } catch (error) {
        console.log("Error is here");
        console.log(error);
        return res.status(400).json({
            error: true,
            message: "An error occured"
        });
    }
};

module.exports.displayVideo = async (req, res, next) => {
    Video.find({})
    .sort({createdAt:-1})
    .then((videos)=>{
        let currentDomain = "http://localhost:3001";
        videos = videos.map((video) => {
            video.videoPath = currentDomain + video.videoPath;
            video.thumbnailPath = currentDomain + video.thumbnailPath;
            video.trimmedVideo = currentDomain + video.trimmedVideo;

            return video;
        });
        return res.status(200).json({
            error: false,
            videos
        });
    })
    .catch((error)=>{
        console.log(error);
        return res.status(400).json({
            error: false,
            message: "An error occured.."
        });
    })
}