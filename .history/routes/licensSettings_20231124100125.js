const express = require('express');
const router = express.Router();
const licenssettings = require('/Users/olfabendhaou/Desktop/Internship-Backend/controllers/licensSettings')
const verifyToken = require("../middleware/authorize");
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");
router.use(verifyToken);

router.post("/uploadfile", upload.single("file"), async(req,res) => {
    try {
         // Upload file to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        const url=result.secure_url
        const cloudinary_id=result.public_id

        res.status(200).send({msg : "File uploded successfully ",url, cloudinary_id})
    } 
    catch (Error) {  
        res.status(400).send({msg : "file not uploded! try again ", error}) 
    }
}
)   

router.post('/', licenssettings);
module.exports= router;


