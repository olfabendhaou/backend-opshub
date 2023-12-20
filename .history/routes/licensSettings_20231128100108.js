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
        if (!cloudinary_id && !url){
            res.status(400).json({msg : "file not supported! try again ", Error}) 
        }
         else { 
        console.error('Error uploading file to Cloudinary:', Error);
        res.status(500).json({msg : "Internal error server", Error}) 
    }
}
} 
) 

router.post('/',keyvalidator() licenssettings);
module.exports= router;


