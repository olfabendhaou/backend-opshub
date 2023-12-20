const express = require('express');
const router = express.Router();
const {
  createConnectedSystemInstance,
  getInstancesBySystem1,
  getInstancesBySystem2,
  countInstances,
  checkurl

}= require("../controllers/ConnectedsystemsInstanceController")
const isAuth= require("../middleware/authorize");



router.post('/create',isAuth,createConnectedSystemInstance);

router.get('/system1-instances/:connected_system_id_1',isAuth,getInstancesBySystem1);
 
  router.get('/system2-instances/:connected_system_id_2',isAuth,getInstancesBySystem2);
  
router.get('/count',isAuth,countInstances);
  
  router.get('/check-url-validity',isAuth,checkurl);
  
module.exports = router;