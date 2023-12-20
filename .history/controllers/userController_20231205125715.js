const userService = require("../services/userService");
const pool = require("../config.js").pool;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'opshubcommunity@gmail.com',
    pass: 'jwra mgln tink wkaa',
  },
});

/////////////get all users///////
const getAllUsers = async (req, res) => {
  const results = await userService.getAllUsers();
  res.status(200).json(results);
};
/////////////////////Create user action///////////////
const createUserAction = async (req, res) => {
  const {login, name, surname, email, action, action_time} = req.body;
  try{
    const action  = await userService.createUser({firstname, lastname, jobtitle, company, city, postalcode,  state, language, timezone, telephone, emailadress, password});
    console.log (user);
  res.status(200).json({
    status: "user added successfully",
    user,
  })
}
}
  catch(err){
    res.status(400).send({msg : "can not add user"}) 
  }
  };

/////////////////////Create user//////////////////////
const createUser = async (req, res) => {
  const {firstname, lastname, jobtitle, company, city, postalcode, state, language, timezone, telephone, emailadress, password} = req.body;
  try{
    console.log (firstname, lastname, jobtitle);
    const foundusers= await pool.query('SELECT * FROM Users2 WHERE emailadress=$1',[emailadress]);
    console.log (foundusers);
    if (foundusers.rowCount>0){
      return res.status(404).json({ msg:"Email Adress used!"});
    }
    else{
    const user = await userService.createUser({firstname, lastname, jobtitle, company, city, postalcode,  state, language, timezone, telephone, emailadress, password});
    console.log (user);
  res.status(200).json({
    status: "user added successfully",
    user,
  })
}
}
  catch(err){
    res.status(400).send({msg : "can not add user"}) 
  }
  };

const getUserById = async (req, res) => {
    const { id } = req.params;
    if (+id === req.user.id ) {
      try {
        const user = await userService.getUserById(id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    return res.status(401).json({ message: "Unauthorized" });
  };
  
////////////////User Profile///////////////
const getUserProfile = async (req, res) => {
    console.log('req.user:', req.user);
    const user = await userService.getUserById(req.user);
  
    return res.json(user);
};
///////////////////////Update user///////////
const updateUser = async (req, res) => {
    const {firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password} = req.body;
    const id = parseInt(req.params.id,10);
      try {
        console.log('Received userId:',id);
        const results = await userService.updateUser(req.body,id);
        console.log('Results:', results);
        if (!results) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(results);
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
  };
  ////////////////////Passowrd Reset /////////////
  const changeUserPassword = async (req, res) => {
    const { oldpassword, newpassword, confirmnewpassword } = req.body;
    const id = parseInt(req.params.id,10);
    console.log('Received password:', oldpassword);
    console.log('Received userId:',id);
    try {
      console.log('hello');
      const user = await pool.query('SELECT * FROM Users2 WHERE id = $1',[id]);
      console.log(user);
      if (user.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      else
        // Compare oldPassword with the password
        if (user.rows[0].password!== oldpassword) {
            return res.status(400).json({ errors: [{ msg: "Veuillez vérifier votre mot de passe" }] });
        }
      else 
     
      if (newpassword !== confirmnewpassword )
      { 
          return res.status(400).send({errors : [{msg : "veuillez vérifier votre nouveau mot de passe"}]})
      }
      else{
        const newUser = await pool.query("UPDATE Users2 SET password = $1 WHERE id = $2",[
          newpassword,
          id,
        ]);;
        console.log(newUser);
        return res.status(200).json({success : [{ message: 'Password updated successfully'}] , user:newUser});
    } }
    catch (error) {
      return res.status(400).json({ message: 'Internal Server Error' });
    }
  };
module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  getUserProfile,
  changeUserPassword,
};