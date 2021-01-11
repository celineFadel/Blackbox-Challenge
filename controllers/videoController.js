let { correctFilePath } = require("../functions/functions");
let {LogTime} = require("../functions/LogTime");


module.exports.uploadVideo = async (req, res, next) => {
    // console.log(LogTime.getResult());

    if (!req.files) {
        return res.status(400).json({
            error: true,
            message: "Video is missing",
        });
    }

    let video, video_obj;
    video_obj = {
        path: correctFilePath(req.files['path'][0].path)
    };
    if(req.files['thumbnail_path']) {
        video_obj = {
            path: correctFilePath(req.files['path'][0].path),
            thumbnail_path: correctFilePath(req.files['thumbnail_path'][0].path)
        };
    }
    
    try {
        console.log(video_obj);
        // video = await UserManager.createUser(video_obj);
    } catch (error) {
        console.log("Error is here");
        console.log(error);
        return next(error);
    }
    return res.status(200).json({
        error: false,
        message: "Video uploaded!",
    });
};
