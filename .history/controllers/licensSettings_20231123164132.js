

const {createlicenceskeydb}= require ('/Users/olfabendhaou/Desktop/Internship-Backend/db/LicensSettings');

const licenssettings = async (req,res)=>{
    const {license_key}= req.body
    try{
        const result = await createlicenceskeydb({license_key});
        res.status(200).json({
            status: "license_key added successfully",
            result,
          })
        }
    catch(err){
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = licenssettings