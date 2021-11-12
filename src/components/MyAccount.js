import React from 'react';

const MyAccount = ({ user }) => {
  console.log(user)
  return <>
    <div>Welcome, {user.username}!</div>
  </>
}
export default MyAccount;