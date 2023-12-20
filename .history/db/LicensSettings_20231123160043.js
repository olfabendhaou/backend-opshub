const pool1 = require("../config.js").pool1;


const createlicenceskeydb = async()=>{
    const { rows: licens } = await pool1.query(
        `INSERT INTO licens (date,user_name,account_name,license_key,license_valid_from,license_valid_to ) 
        VALUES($1,$2,$3,$4,$5,$6,$7) 
        returning  id, date,user_name,account_name,license_key,license_valid_from,license_valid_to`,
        [firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password]
      );
      return Users2[0];
    };
}