
const {check , validationResult} = require("express-validator")


exports.registerValidator = () => [
    check("firstname" , "Insert your firstname !").not().isEmpty() ,
    check("lastname" , "Insert your lastname! !").not().isEmpty() ,
    check("jobtitle" , "Insert your jobtitle !!").not().isEmpty() ,
    check("company" , "Insert your company!").not().isEmpty() ,
    check("city" , "Insert your city!").not().isEmpty() ,
    check("postalcode" , "Insert your postalcode!").isNumeric() ,
    check("country" , "Insert your country !!").not().isEmpty() ,
    check("state" , "Insert your state ! !").not().isEmpty() ,
    check("language" , "Insert your language!").not().isEmpty() ,
    check("timezone" , "Insert your timezone!").isTimezone(),
    check("telephone" , "Insert your telephone!").not().isEmpty() ,
    check("emailadress" , "Insert your !!").isEmail() ,
    check("password" , "Insert your !!").isLength({min : 6})
]
exports.loginValidator = () => [
    check("email" , "Veuillez insérer une email valide!").isEmail() ,
    check("password" , "Veuillez insérer votre password!").isLength({min : 6})
]
module.exports=validator=async (req,res,next) =>{
    const errors = validationResult(req) 
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    } 
    next()
}











firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password











// module.exports = function(req, res, next) {
//     const { email, name, password } = req.body;
  
//     function validEmail(userEmail) {
//       return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
//     }
  
//     if (req.path === "/register") {
//       console.log(!email.length);
//       if (![email, name, password].every(Boolean)) {
//         return res.json("Missing Credentials");
//       } else if (!validEmail(email)) {
//         return res.json("Invalid Email");
//       }
//     } else if (req.path === "/login") {
//       if (![email, password].every(Boolean)) {
//         return res.json("Missing Credentials");
//       } else if (!validEmail(email)) {
//         return res.json("Invalid Email");
//       }
//     }
  
//     next();
//   };