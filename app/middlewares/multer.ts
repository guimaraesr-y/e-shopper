import multer from "multer";
import crypto from "crypto";

export default class Multer {

    private static storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
            let customFileName = crypto.randomBytes(18).toString('hex') + Date.now()
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            
            cb(null, customFileName + '.' + extension)
        }
    })

    private static middleware = multer({
        storage: Multer.storage
    }).array('images', 5)

    public static get upload() {
        return Multer.middleware
    }

}