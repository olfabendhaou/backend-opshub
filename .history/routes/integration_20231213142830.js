const express = require('express');
const router = express.Router();
const {
  createIntegration,
  countIntegrations
  
} = require('../controllers/IntegrationController');


const isAuth = require("../middleware/authorize");


router.post('/create',isAuth,createIntegration);

router.route('/count').get(countIntegrations);
module.exports = router;