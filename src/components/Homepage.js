import React from 'react';

const Homepage = ({ user }) => {
  return <>
    <div class='d-flex flex-row justify-content-center'>
      <h3>
        Welcome to the Robo Hackers Shop where we sell robot themed collectibles and computer parts.
      </h3>
    </div>
    <div class=''>
      <img src='https://i.ebayimg.com/images/g/5GYAAOSw5CZhbYLF/s-l1600.jpg' class='img-thumbnail' class='w-25' alt=''></img>
      <img src='https://i.ebayimg.com/images/g/QeEAAOSw7QphgHWm/s-l1600.jpg' class='img-thumbnail' class='w-25' alt=''></img>
    </div>
    
  </>
}
export default Homepage;