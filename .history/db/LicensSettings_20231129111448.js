const pool1 = require("../config.js").pool1;
const fs = require('fs');

const readFile(filePath)=s



const createlicenceskeydb = async({license_key})=>{
    try {
        const { rows: license } = await pool1.query(
          `INSERT INTO license (license_key) 
            VALUES($1) 
            returning id, license_key`,
          [license_key]
        );
        console.log(license[0]);
        return license[0];
      } catch (error) {
        console.error('Error inserting into licens table:', error);
        throw error;
      }
    };
    module.exports ={createlicenceskeydb}