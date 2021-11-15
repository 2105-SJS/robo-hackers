import React from 'react';
import AddProduct from './';

const MyAccount = ({ user }) => {
  return <>
    <div>Welcome, {user.username}!</div>

    {
      isAdmin ? 
      <AddProduct /> : null
    }
  </>
}
export default MyAccount;