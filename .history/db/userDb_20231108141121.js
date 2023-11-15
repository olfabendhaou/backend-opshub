const pool = require("../config.js").pool;



//////////Get All Users//////////
const getAllUsersDb = async () => {
  const { rows: users } = await pool.query("select * from Users2");
  return users;
};

/////////////Create User////////////
const createUserDb = async ({firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password}) => {
  const { rows: Users2 } = await pool.query(
    `INSERT INTO Users2 (firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password ) 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) 
    returning  id, firstname, lastname, jobtitle, company, city, postalCode,country ,state, language, timezone, telephone, emailadress, password`,
    [firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password]
  );
  return Users2[0];
};


/////////////////Get user By id////////////////////
const getUserByIdDb = async function(id) {
    try {
      const query = {
        text: 'SELECT * FROM Users2 WHERE id = $1',
        values: [id],
      };
      console.log('Query:', query.text, 'Values:', query.values);
      const result = await pool.query(query);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error in getUserByIdDb:', error);
      throw error;
    }
  };
  ////////////////////////Get user by name////
  async function getUserByNameDb(firstname) {
    try {
      
      const query = {
        text: 'SELECT * FROM Users2 WHERE firstname = $1',
        values: [firstname],
      };
  
     
      const result = await pool.query(query);
  
      
      if (result.rows.length === 0) {
        return null; 
      }
  
      
      return result.rows[0];
    } catch (error) {
      console.error('Error in getUserByIdDb:', error);
      throw error;
    }
  }

  ////////////////Get User by Email///////
  async function getUserByEmailDb(emailadress) {
    try {
      const query = {
        text: 'SELECT * FROM Users2 WHERE emailadress = $1',
        values: [emailadress],
      };
  
     
      const result = await pool.query(query);
  
     
      if (result.rows.length === 0) {
        return null; 
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error in getUserByIdDb:', error);
      throw error;
    }
  }

  ///////////////////Update User ////////////
const updateUserDb = async ({
  firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password
}) => {
  const { rows: user } = await pool.query(
    `UPDATE Users2 set firstname=$1, lastname=$2, jobtitle=$3, company=$4, city=$5, postalcode=$6 ,country=$7, state=$8, language=$9, timezone=$10, telephone=$11, emailadress=$12, password=$13,
      where id = $14 returning firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password`,
    [firstname, lastname, jobtitle, company, city, postalcode,country, state, language, timezone, telephone, emailadress, password]
  );
  return user[0];
};
///////////////delete user/////////////
const deleteUserDb = async (id) => {
  const { rows: user } = await pool.query(
    "DELETE FROM Users2 where id = $1 returning *",
    [id]
  );
  return user[0];
};


///////////Change Passsword//////////
const changeUserPasswordDb = async (password, email) => {
  return await pool.query("update Users2 set password = $1 where emailadress = $2", [
    password,
    emailadress,
  ]);
};

module.exports = {
  getAllUsersDb,
  getUserByIdDb,
  getUserByNameDb,
  getUserByEmailDb,
  updateUserDb,
  createUserDb,
  deleteUserDb,
  changeUserPasswordDb,
};