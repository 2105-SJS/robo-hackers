const { client } = require('./index');
const bcrypt = require('bcrypt');

const createUser = async ({firstName, lastName, email, imageURL, username, password, isAdmin}) => {
  try {
    const SALT_COUNT = 10;
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

module.exports = {
  createUser
}