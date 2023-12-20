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
  router.post("/user",registerValidator(),validator(),createUser)
  router.post("/user_action",isAuth(),createUserAction)
  router.get("/profile",isAuth(),getUserProfile);
  router.get("/:id",isAuth(),getUserById)
  router.put("/:id",registerValidator(),validator(),isAuth(),updateUser);
  router.put('/password-reset/:id',isAuth(),changeUserPassword);
  module.exports = router;