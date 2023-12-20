const jwt = require("jsonwebtoken");
require('dotenv').config;
function jwtGenerator(id){
    const payload={
        user: uid
    }
   return jwt.sign(payload, `${process.env.jwtSecret}`, {expiresIn:'1hr'});
}

module.exports=jwtGenerator;