

const {createlicenceskeydb,readFile}= require ('/Users/olfabendhaou/Desktop/Internship-Backend/db/LicensSettings');

const uploadfile =async({fileContent}) => {
    try {
         // Upload file to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path,{ resource_type: 'raw' });
        const url=result.secure_url
        const cloudinary_id=result.public_id
        const fileContent = await readFile(url);
        res.status(200).send({msg : "File uploded successfully ",fileContent})
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
const licenssettings = async (req,res)=>{
    try{
    const {license_key}= req.body

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