const{
   CreateConnctedSystems,
   getConnectSystems
    
    }= require("../controllers/ConnctedSystemsController");
const router = require("express").Router();

const isAuth = require("../middleware/authorize");


/////////////////////Create a connected system////////////////////////
router.post("/create",isAuthCreateConnctedSystems);
///////////////////get connected systems//////////////////////
router.route("/connectedsystems").get(getConnectSystems);
module.exports = router;
