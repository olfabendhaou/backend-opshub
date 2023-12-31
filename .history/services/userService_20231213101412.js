const {
    createUserDb,
    getUserByEmailDb,
    getUserByNameDb,
    changeUserPasswordDb,
    getUserByIdDb,
    updateUserDb,
    deleteUserDb,
    getAllUsersDb,
    
  } = require("../db/userDb");
 
  class UserService {

    ////////Create user////
    createUser = async (user) => {
      try {
        return await createUserDb(user);
      } catch (error) {
        console.error('Error:', error);
    throw error;
      }
    };

    ///////Get user by email///////
    getUserByEmail = async (emailadress) => {
      try {
        const user = await getUserByEmailDb(emailadress);
        return user;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    };
    //////////////Get user by username/////
    getUserByUsername = async (firstname) => {
      try {
        const user = await getUserByNameDb(firstname);
        return user;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    };
    ////////////Get user by id ///////////
    getUserById = async () => {
      try {
          const user = await getUserByIdDb(id);
        return user;
      } catch (error) {
          console.error('Error:', error);
          throw error;
      }
    };
    /////////////Change Passowrd////////////
    // changeUserPassword = async (password, id) => {
    //   try {
    //     const existingUser = await getUserByIdDb(id);
    //     const comparepassword = existingUser.password === password;
    //     if (comparepassword) {
    //     return await changeUserPasswordDb(password,id);
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    // throw error;
    //   }
    // };
    //////////Update user///////////////
    updateUser = async (updateuser,id) => {
        const errors = {};
        try {
          const existingUser = await getUserByIdDb(id);
          const findUserByEmail = await getUserByEmailDb(updateuser.emailadress);
          // const findUserByUsername = await getUserByNameDb(firstname);
          const emailChanged =
          existingUser.emailadress.toLowerCase() !== updateuser.emailadress.toLowerCase();
          // const usernameChanged =
          // firstname && getUser.firstname.toLowerCase() !== firstname.toLowerCase();
          console.log(findUserByEmail);
          if (emailChanged && findUserByEmail!=null) {
            errors["emailadress"] = "Email is already taken";
          }
          // if (usernameChanged && typeof findUserByUsername === "object") {
          //   errors["username"] = "Username is already taken";
          // }
          return await updateUserDb(updateuser,id);
        } catch (error) {
          
          console.error('Error:', error);
          throw error; 
        }
      };
      
  ///////////////Delete user//////////
    deleteUser = async (id) => {
      try {
        return await deleteUserDb(id);
      } catch (error) {
        console.error('Error:', error);
    throw error;
      }
    };
  /////////////////Get all users//////
    getAllUsers = async () => {
      try {
        return await getAllUsersDb();
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    };
  }
  
  module.exports = new UserService();