const {registerValidator,validator}= require('/Users/olfabendhaou/Desktop/Internship-Backend/middleware/validInfo');
const {
  createUserAction,
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    getUserProfile,
    changeUserPassword,
  }= require("../controllers/userController");
  const router = require("express").Router();
  const isAuth= require("../middleware/authorize");
  router.post("/user",registerValidator(),validator,createUser)
  router.post("/user_action",isAuth,createUserAction)
  router.get("/profile",isAuth,getUserProfile);
  router.get("/:id").get(getUserById)
  router.put("/:id",registerValidator(),validator,updateUser);
  router.route('/password-reset/:id').put(changeUserPassword);
  module.exports = router;