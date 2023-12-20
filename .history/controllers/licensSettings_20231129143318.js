
const fs = require('fs');
const {createlicenceskeydb,readFile}= require ('/Users/olfabendhaou/Desktop/Internship-Backend/db/LicensSettings');
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");
const uploadfile =async(req,res) => {
    try {
         // Upload file to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path,{ resource_type: 'raw' });
        const url=result.secure_url
        const cloudinary_id=result.public_id
        res.status(200).send({msg : "File uploded successfully ",cloudinary_id,url})
    }
    catch (Error) { 
        if (!cloudinary_id&& url){
            res.status(400).json({msg : "file not supported! try again ", Error}) 
        }
        else { 
        console.error('Error uploading file to Cloudinary:', Error);
        res.status(500).json({msg : "Internal error server", Error}) 
    }
}
} 
const licenssettings = async (req,res)=>{
    const {license_key}= req.body
    try{
        console.log(req.body);
        const result = await createlicenceskeydb({license_key});
        console.log(result);
        res.status(200).json({
            status: "license_key added successfully",
            result,
          })
        }
    catch(err){
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = {licenssettings,uploadfile}