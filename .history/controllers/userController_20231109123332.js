const userService = require("../services/userService");
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
/////////////////////Create user//////////////////////
const createUser = async (req, res) => {
  const { user_name, user_email, user_password, state, country } = req.body;
  

  const user = await userService.createUser({
    user_name, user_email, user_password, state, country
  });

  res.status(201).json({
    status: "success",
    user,
  });
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
        return res.status(201).json(results);
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
      const comparepassword= newpassword===confirmnewpassword 
      const user = await pool.query('SELECT * FROM Users WHERE id = $1',[id]);
      if (user.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log('User query result:', user.rows[0].password);

        // Compare oldPassword with the password
        if (user.rows[0].password!== oldPassword) {
            return res.status(400).json({ errors: [{ msg: "Veuillez vérifier votre mot de passe" }] });
        }
      else 
      //   const mailOptions = {
      //     from: 'opshubcommunity@gmail.com',
      //     to: user_email,
      //     subject: 'Password Change Notification',
      //     text: 'Your password has been changed successfully.',
      //   };
  
      //   transporter.sendMail(mailOptions, (error, info) => {
      //     if (error) {
      //       console.error('Error sending email:', error);
      //     } else {
      //       console.log('Email sent:', info.response);
      //     }
      //   });
      if (!comparepassword)
      { 
          return res.status(400).send({errors : [{msg : "veuillez vérifier votre nouveau mot de passe"}]})
      }
      else{
        const newUser = await userService.changeUserPassword(newpassword,id);
        
        return res.status(200).json({success : [{ message: 'Password updated successfully'}] ,user:newUser});
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