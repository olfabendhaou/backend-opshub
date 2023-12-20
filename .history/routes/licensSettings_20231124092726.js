const express = require('express');
const router = express.Router();
const licenssettings = require('/Users/olfabendhaou/Desktop/Internship-Backend/controllers/licensSettings')
const verifyToken = require("../middleware/authorize");
const cloudinary = require("../Middlewares/cloudinary");
const upload = require("../Middlewares/multer");
router.use(verifyToken);

router.post("/u", isAuth, upload.single("image"), async(req,res) => {
    try {
         // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        

router.post('/', licenssettings);
module.exports= router;


