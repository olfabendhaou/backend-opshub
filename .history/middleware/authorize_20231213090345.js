const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  try {
  // Get token from header
  const token = req.header("Authorization");
  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "Authorization denied - Token not provided" });
  }
  // Verify token
  
    const decoded = jwt.verify(token.replace("Bearer ", ""), `${process.env.SCRT_KEY}`);

    // Attach the user object from the token to the request
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
