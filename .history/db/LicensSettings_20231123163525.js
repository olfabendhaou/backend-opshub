const pool1 = require("../config.js").pool1;


const createlicenceskeydb = async({date,user_name,account_name,license_key,license_valid_from,license_valid_to})=>{
    const { rows: licens } = await pool1.query(
        `INSERT INTO licens (license_key) 
        VALUES($1,$2,$3,$4,$5,$6,$7) 
        returning  id,date,user_name,account_name,license_key,license_valid_from,license_valid_to`,
        [date,user_name,account_name,license_key,license_valid_from,license_valid_to]
      );
      return licens;
    };
    module.exports ={createlicenceskeydb}