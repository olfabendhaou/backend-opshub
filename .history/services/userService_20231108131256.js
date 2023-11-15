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
    
    getUserById = async (id) => {
      try {
          const user = await getUserByIdDb(id);
        return user;
      } catch (error) {
          console.error('Error:', error);
          throw error;
      }
    };
    /////////////Change Passowrd////////////
    changeUserPassword = async (password, emailadress) => {
      try {
        return await changeUserPasswordDb(password, emailadress);
      } catch (error) {
        console.error('Error:', error);
    throw error;
      }
    };
    //////////Update user///////////////
    updateUser = async (id) => {
      const user={firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password}
        const errors = {};
        try {
          const existingUser = await getUserByIdDb(id);
          const findUserByEmail = await getUserByEmailDb(user.emailadress);
          // const findUserByUsername = await getUserByNameDb(firstname);
          const emailChanged =
          existingUser.emailadress.toLowerCase() !== emailadress.toLowerCase();
          // const usernameChanged =
          // firstname && getUser.firstname.toLowerCase() !== firstname.toLowerCase();
      
          if (emailChanged && findUserByEmail.rows.length > 0) {
            errors["email"] = "Email is already taken";
          }
          // if (usernameChanged && typeof findUserByUsername === "object") {
          //   errors["username"] = "Username is already taken";
          // }
      
          if (Object.keys(errors).length > 0) {
            const error = new Error("Validation error");
            error.statusCode = 403; 
            error.errors = errors;
            throw error;
          }
      
          return await updateUserDb(user);
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