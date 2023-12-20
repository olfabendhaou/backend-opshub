const { Console } = require("console");
const multer = require("multer");
const path = require("path");
// Multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".XML" ) {
    cb(new Error("Unsupported file type!"), false);
    console
    return;
    }
    cb(null, true);
},
});