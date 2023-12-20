const pool1 = require("../config.js").pool1;


const createlicenceskeydb = async()=>{
    const { rows: licens } = await pool1.query(
        `INSERT INTO Users2 (firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password ) 
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) 
        returning  id, firstname, lastname, jobtitle, company, city, postalCode,country ,state, language, timezone, telephone, emailadress, password`,
        [firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password]
      );
      return Users2[0];
    };
}