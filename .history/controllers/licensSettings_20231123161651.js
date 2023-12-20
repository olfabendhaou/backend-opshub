


const licenssettings = async (req,res)=>{
    const {license_key}= req.body
    try{
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