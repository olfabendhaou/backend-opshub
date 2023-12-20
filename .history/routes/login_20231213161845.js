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
// const validInfo = require("../middleware/validInfo");

const tokens = {};
router.post("/login",loginValidator(),validator,async(req, res) => {
    const {emailadress, password } = req.body;
  
    try {
      const founduser = await pool.query("SELECT * FROM Users2 WHERE emailadress = $1", [
        emailadress
      ]);
      if (founduser.rows.length === 0) {
        return res.status(400).json("Email or Password incorrect1");
      }
      const validPassword= password === founduser.rows[0].password;
      if (!validPassword) {
        return res.status(400).json("Email or Password incorrect2");
      }
      const userId=founduser.rows[0].id
      const existingToken = Object.keys(tokens).find(
        (token) => tokens[token].userId === userId && jwt.verify(token, process.env.SCRT_KEY, {ignoreExpiration: false})
      );
      if (existingToken) {
        return res.json({msg: 'token already exist', token: existingToken ,user:founduser.rows[0]});
      }
      
      const token = jwt.sign({id:userId},process.env.SCRT_KEY,{expiresIn : "4s"});
      tokens[token] = { userId, expirationTime: jwt.decode(token).exp };
      return res.status(200).json({success : [{ msg :"welcom back"}], token, user:founduser.rows[0]});
     
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
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