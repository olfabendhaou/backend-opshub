const express = require('express');
const router = express.Router();
const {licenssettings,uploadfile} = require('/Users/olfabendhaou/Desktop/Internship-Backend/controllers/licensSettings')
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");
const {keyvalidator}= require('/Users/olfabendhaou/Desktop/Internship-Backend/middleware/validInfo');

router.post("/uploadfile", upload.single("file"), uploadfile
) 

router.post('/',keyvalidator(), licenssettings);
module.exports= router;


