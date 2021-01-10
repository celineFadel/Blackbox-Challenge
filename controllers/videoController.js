let { correctFilePath } = require("../functions/functions");
let {LogTime} = require("../functions/LogTime");

module.exports.uploadVideo = async (req, res, next) => {
    console.log(LogTime.getResult());

    if (!req.file) {
        return res.status(400).json({
            error: true,
            message: "Video is missing",
        });
    }

    let video, video_obj;
    video_obj = {
        path: correctFilePath(req.file.path),
    };
    try {
        console.log(video_obj);
        // video = await UserManager.createUser(video_obj);
    } catch (error) {
        return next(error);
    }
    return res.status(200).json({
        error: false,
        message: "Video uploaded!",
    });
};
