const pool = require("../config.js").pool;

 async function createUserActiondb ({login, name, surname, email, action, action_time}) {
  const { rows: sys_ui_audit } = await pool.query(
    `INSERT INTO sys_ui_audit (login, name, surname, email, action, action_time) 
    VALUES($1,$2,$3,$4,$5,$6) 
    returning  id_action, login, name, surname, email, action, action_time`,
    [login, name, surname, email, action, action_time]
  );
  console.log(sys_ui_audit[0])
  return sys_ui_audit[0];
};

//////////Get All Users//////////
const getAllUsersDb = async () => {
  const { rows:Users2  } = await pool.query("SELECT * FROM Users2");
  return Users2;
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
        text: 'SELECT * FROM Users2 WHERE id =$1',
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
  firstname, lastname, jobtitle, company, city, postalcode, state, language, telephone, emailadress, password, country, timezone
},id) => {
  const { rows: Users2 } = await pool.query(
    `UPDATE Users2
    SET firstname=$1, lastname=$2, jobtitle=$3, company=$4, city=$5, postalcode=$6, state=$7, language=$8,telephone=$9, emailadress=$10, password=$11, country=$12, timezone=$13,
    WHERE id = $14
    RETURNING firstname, lastname, jobtitle, company, city, postalcode, state, language, telephone, emailadress, password, country, timezone, id
    `,
    [firstname, lastname, jobtitle, company, city, postalcode, state, language, timezone, telephone, emailadress, password,id]
  );
  return Users2[0];
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
// const changeUserPasswordDb = async (password,id) => {
//    await pool.query("UPDATE Users2 SET password = $1 WHERE id = $2",[
//     password,
//     id,
//   ]);
// };
module.exports = {
  createUserActiondb,
  getAllUsersDb,
  getUserByIdDb,
  getUserByNameDb,
  getUserByEmailDb,
  updateUserDb,
  createUserDb,
  deleteUserDb,

};