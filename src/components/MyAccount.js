import React from 'react';

const MyAccount = ({ user }) => {
  console.log(user)
  return <>
    <div>Welcome, {user.username}!</div>
    <img src='https://static01.nyt.com/images/2011/09/28/dining/28CHICKSKIN_SPAN/28CHICKSKIN-articleLarge.jpg?quality=75&auto=webp&disable=upscale'></img>
  </>
}
export default MyAccount;