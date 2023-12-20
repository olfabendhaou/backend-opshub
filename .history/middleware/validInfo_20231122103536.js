
const {check , validationResult} = require("express-validator")


exports.registerValidator = () => [
    check("firstname" , "Veuillez insérer votre prénom !").not().isEmpty() ,
    check("lastname" , "Veuillez insérer votre nom !").not().isEmpty() ,
    check("jobtitle" , "Veuillez insérer votre !").not().isEmpty() ,
    check("company" , "Veuillez insérer votre prénom !").not().isEmpty() ,
    check("city" , "Veuillez insérer votre prénom !").not().isEmpty() ,
    check("postalcode" , "Veuillez insérer votre prénom !").not().isEmpty() ,
    check("country" , "Veuillez insérer votre prénom !").not().isEmpty() ,
    check("state" , "Veuillez insérer votre prénom !").not().isEmpty() ,
    
    
    
    

    check("emailadress" , "Veuillez insérer un email valide !").isEmail() ,
    check("password" , "Veuillez insérer votre password!").isLength({min : 6})
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