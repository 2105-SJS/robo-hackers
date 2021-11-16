import React from 'react';

const MyAccount = ({ user }) => {
  return <>
    <div>Welcome, {user.username}!</div>
  </>
}
export default MyAccount;