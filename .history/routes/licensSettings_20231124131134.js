const express = require('express');
const router = express.Router();
const licenssettings = require('/Users/olfabendhaou/Desktop/Internship-Backend/controllers/licensSettings')
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");

router.post("/uploadfile", upload.single("file"), async(req,res) => {
    try {
         // Upload file to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path,{ resource_type: 'raw' });
        const url=result.secure_url
        const cloudinary_id=result.public_id

        res.status(200).send({msg : "File uploded successfully ",url, cloudinary_id})
    } 
    catch (Error) {  
        console.error('Error uploading file to Cloudinary:', Error);
        res.status(400).send({msg : "file not supported! try again ", Error}) 
    }
}
)   

router.post('/', licenssettings);
module.exports= router;


