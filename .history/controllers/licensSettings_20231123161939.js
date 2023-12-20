

const createlicenceskeydb= require '/Users/olfabendhaou/Desktop/Internship-Backend/db/LicensSettings'
const licenssettings = async (req,res)=>{
    
    try{
        const {license_key}= req.body
        const result = await createlicenceskeydb(req.body);
        res.status(200).json({
            status: "license_key added successfully",
            result,
          })
        }
    catch(err){
        res.status(500).json({ message: 'Internal Server Error' });
    }
}