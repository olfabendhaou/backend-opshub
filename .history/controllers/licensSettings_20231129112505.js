

const {createlicenceskeydb}= require ('/Users/olfabendhaou/Desktop/Internship-Backend/db/LicensSettings');


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
module.exports = licenssettings