const pool1 = require("../config.js").pool1;
const fs = require('fs');

const readFile=async(filePath){
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

const extractLicenseKey =async(fileContent) {
  // Assuming the license key is a string in the file (modify this based on your file format)
  const licenseKeyRegex = /license_Key: (\w+)/;
  const match = fileContent.match(licenseKeyRegex);

  if (match) {
    return match[1]; // Extract the license key
  } else {
    throw new Error('License key not found in the file.');
  }
}

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