const {
createTemplate,
getTemplates,
deleteTemplate
}=require('../controllers/TemplateContoller')
const router = require("express").Router();

const isAuth= require("../middleware/authorize");



////////////////////create template/////////////////////
router.post("/create",isAuth,createTemplate);

///////////////////get templates//////////////////////
router.("/templates").get(getTemplates);
/////////////////////////delete templates///////////////////////////
router.delete("/delete/:id").delete(deleteTemplate);
module.exports = router;
