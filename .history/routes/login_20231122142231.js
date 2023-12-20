const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// const {validator,loginValidator} = require('/Users/olfabendhaou/Desktop/Internship-Backend/middleware/validInfo')
/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description: default user login and generate authorization token for other endpoints
 *
 */


const pool = require("../config.js").pool;
const jwtGenerator = require("../utilis/jwtGenerator");
// const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");

router.post("/login",loginValidator, async(req, res) => {
    const {emailadress, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM Users2 WHERE emailadress = $1", [
        emailadress
      ]);
      if (user.rows.length === 0) {
        return res.status(401).json("Email or Password incorrect1");
      }
      const validPassword= password === user.rows[0].password;
      if (!validPassword) {
        return res.status(401).json("Email or Password incorrect2");
      }
      const jwtToken = jwtGenerator(user.rows[0].id);
      return res.json({jwtToken});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  module.exports= router;