const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {loginValidator,validator} = require('/Users/olfabendhaou/Desktop/Internship-Backend/middleware/validInfo')

/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description: default user login and generate authorization token for other endpoints
 *
 */

 const jwt = require('jsonwebtoken')
const pool = require("../config.js").pool;
const jwtGenerator = require("../utilis/jwtGenerator");
// const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");

router.post("/login",loginValidator(),validator,async(req, res) => {
    const {emailadress, password } = req.body;
  
    try {
      const founduser = await pool.query("SELECT * FROM Users2 WHERE emailadress = $1", [
        emailadress
      ]);
      if (founduser.rows.length === 0) {
        return res.status(401).json("Email or Password incorrect1");
      }
      const validPassword= password === founduser.rows[0].password;
      if (!validPassword) {
        return res.status(401).json("Email or Password incorrect2");
      }
      const jwtToken = jwt.sign({id:user.rows[0].id},process.env.SCRT_KEY,{expiresIn : "1h"});
      return res.status(200).send({success : [{ msg :"welcom back"}], token,user:founduser.rowa[0]});
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors : [{ msg : "oooops!check your informations!"}]});
    }
  });
  // router.post("/verify", authorize, (req, res) => {
  //   try {
  //     res.json(true);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send("Server error");
  //   }
  // });
  module.exports= router;