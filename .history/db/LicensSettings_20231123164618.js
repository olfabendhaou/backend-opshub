const pool1 = require("../config.js").pool1;


const createlicenceskeydb = async({license_key})=>{
    const { rows: licens } = await pool1.query(
        `INSERT INTO licens (license_key) 
        VALUES($1) 
        returning  (id,license_key)`,
        [license_key]
      );
      
      return licens[0];
    };
    module.exports ={createlicenceskeydb}