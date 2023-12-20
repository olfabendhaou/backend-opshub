const express = require('express');
const router = express.Router();
const licenssettings = require('./controllers/licensSettings.js')

router.post('/', licenssettings );

