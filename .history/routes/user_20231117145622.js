


const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    getUserProfile,
    changeUserPassword,
  } = require("../controllers/userController");
  const router = require("express").Router();
  const verifyToken = require("../middleware/authorize");
  router.post("/user",createUser)
  router.use(verifyToken);
  router.post("/user",createUser)
  router.route("/profile").get(getUserProfile);
  router.route("/:id").get(getUserById).put(updateUser);
  router.route('/password-reset/:id').put(changeUserPassword);
  module.exports = router;