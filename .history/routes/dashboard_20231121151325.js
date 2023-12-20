const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../config.js").pool;

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query("SELECT firstname FROM Users2 WHERE id = $1", [req.user]);
    console.log(user.rows[0];
   res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;