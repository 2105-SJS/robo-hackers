const { client } = require('./client');
const bcrypt = require('bcrypt');

const SALT_COUNT = 10;

const createUser = async ({firstName, lastName, email, imageURL, username, password, isAdmin}) => {

  if (!imageURL) {
    imageURL = "placeholder picture";
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {rows: [user] } = await client.query(`
    INSERT INTO users("firstName", "lastName", email, "imageURL", username, password, "isAdmin")
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

const updateUser = async ({id, username, password, firstName, lastName, imageURL, isAdmin, email}) => {
  try {

    if (username) {
      await client.query(`
      UPDATE users
      SET username=$1
      WHERE id=$2;
      `,[username, id])
    }

    if (password) {
      await client.query(`
      UPDATE users
      SET password=$1
      WHERE id=$2;
      `,[password, id])
    }

    if (firstName) {
      await client.query(`
      UPDATE users
      SET "firstName"=$1
      WHERE id=$2;
      `,[firstName, id])
    }

    if (lastName) {
      await client.query(`
      UPDATE users
      SET "lastName"=$1
      WHERE id=$2;
      `,[lastName, id])
    }

    if (imageURL) {
      await client.query(`
      UPDATE users
      SET "imageURL"=$1
      WHERE id=$2;
      `,[imageURL, id])
    }

    if (isAdmin) {
      await client.query(`
      UPDATE users
      SET "isAdmin"=$1
      WHERE id=$2;
      `,[isAdmin, id])
    }

    if (email) {
      await client.query(`
      UPDATE users
      SET email=$1
      WHERE id=$2;
      `,[email, id])
    }

  } catch (error) {
    throw(error)
  }
}


module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  getUser,
  updateUser
}