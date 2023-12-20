const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../config.js").pool

module.exports  = isAuth = async (req, res, next)  =>{
  try {
  // Get token from header
  const token = req.header("Authorization");
  // Check if not token
  if (!token ) {
    return res.status(403).json({ msg: "Authorization denied - Token not provided" });
  }
  // Verify token
    // Attach the user object from the token to the request
    const id = decoded.id;
    const query = {
      text: 'SELECT * FROM Users2 WHERE id =$1',
      values: [id],
    };
    const founduser = await pool.query(query);
    req.user=founduser.rows[0]
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
