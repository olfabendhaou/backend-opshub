const{
   CreateConnctedSystems,
   getConnectSystems
    
    }= require("../controllers/ConnctedSystemsController");
const router = require("express").Router();

const isAuth = require("../middleware/authorize");


/////////////////////Create a connected system////////////////////////
router.route("/create").post(CreateConnctedSystems);
///////////////////get connected systems//////////////////////
router.route("/connectedsystems").get(getConnectSystems);
module.exports = router;
