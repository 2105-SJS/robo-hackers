const { client } = require('./client');
const bcrypt = require('bcrypt');

const SALT_COUNT = 10;

const createUser = async ({firstName, lastName, email, imageURL, username, password, isAdmin}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {rows: [user] } = await client.query(`
    INSERT INTO users("firstName", "lastName", email, "imageURL" = 'https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg', username, password, "isAdmin")
    VALUES($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [firstName, lastName, email, imageURL, username, hashedPassword, isAdmin]);
    delete user.password;
    return user;
    
  } catch (error) {
    throw error
  }
}

const getUser = async({username, password}) => {
  try {
    const comparedUser = await getUserByUsername(username);
    if (!await bcrypt.compare(password, comparedUser.password)){
      return null;
    }

    delete(comparedUser.password);
    return comparedUser;

  } catch(error) {
    throw(error);
  }
}

const getUserByUsername = async(username) => {
  try {
    const {rows:[user]} = await client.query(`
    SELECT * FROM users
    WHERE username=($1)
    `,[username])

    return user;

  } catch(error) {
    throw(error);
  }
}

const getUserById = async(id) => {
  try {
    const {rows:[user]} = await client.query(`
    SELECT * FROM users
    WHERE id=($1)
    `,[id])

    if (user) {
      delete(user.password);
    }

    return user;

  } catch(error) {
    throw(error);
  }
}

const getAllUsers = async() => {
  try{
    const{rows:users} = await client.query(`
    SELECT * FROM USERS
    `)

    return users;

  } catch(error) {
    throw(error);
  }
}



module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  getUser
}