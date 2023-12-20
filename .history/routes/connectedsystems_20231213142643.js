const{
   CreateConnctedSystems,
   getConnectSystems
    
    }= require("../controllers/ConnctedSystemsController");
const router = require("express").Router();

const isAuth = require("../middleware/authorize");


/////////////////////Create a connected system////////////////////////
router.post("/create",isAuth,CreateConnctedSystems);
///////////////////get connected systems//////////////////////
router.get("/connectedsystems",isAuth,getConnectSystems);
module.exports = router;
