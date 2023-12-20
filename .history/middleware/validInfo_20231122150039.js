
const { check, validationResult } = require("express-validator");

// Registration Validator
exports.registerValidator = () => [
    check("firstname", "Insert your firstname!").not().isEmpty(),
    check("lastname", "Insert your lastname!!").not().isEmpty(),
    check("jobtitle", "Insert your jobtitle!!").not().isEmpty(),
    check("company", "Insert your company!").not().isEmpty(),
    check("city", "Insert your city!").not().isEmpty(),
    check("postalcode", "Insert your postalcode!").isInt(),
    check("country", "Insert your country!!").not().isEmpty(),
    check("state", "Insert your state!!").not().isEmpty(),
    check("language", "Insert your language!").not().isEmpty(),
    check("timezone", "Insert your timezone!").not().isEmpty(),
    check("telephone", "Insert your telephone!").isInt(),
    check("emailadress", "Insert your email!").isEmail(),
    check("password", "Insert your password!").isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        // If no validation errors, proceed to the next middleware or route handler
        next();
    },
];

// Login Validator
exports.loginValidator = () => [

    check("emailadress", "Please Insert a Valid email!").isEmail(),
    check("password", "Please insert a valid password!").isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        // If no validation errors, proceed to the next middleware or route handler
        next();
    },
    
    ];

// // Generic Validator Middleware
// exports.validator = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };






















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