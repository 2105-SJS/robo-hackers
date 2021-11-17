import React from 'react';

const Homepage = ({ user }) => {
  return <>
    <div class='d-flex flex-row justify-content-center'>
      <h3>
        Welcome to the Robo Hackers Shop where we sell robot themed collectibles and computer parts.
      </h3>
    </div>
    <br></br>
    <div className= 'homepage-image'>
      <img className = 'homepage-image' src='https://i.ebayimg.com/images/g/5GYAAOSw5CZhbYLF/s-l1600.jpg' class='img-thumbnail' class='w-25' alt=''></img>
      <img className = 'homepage-image' src='https://i.ebayimg.com/images/g/QeEAAOSw7QphgHWm/s-l1600.jpg' class='img-thumbnail' class='w-25' alt=''></img>
      <img className = 'homepage-image' src='https://www.collectiondx.com/gallery2/d/10743-10/SupertrainMegazord1.jpg' class='img-thumbnail' class='w-25' alt=''></img>
      <img className = 'homepage-image' src='https://bbts1.azureedge.net/images/p/full/2019/02/8ace3bd8-1764-4af5-9439-7aacb8407b8d.jpg' class='img-thumbnail' class='w-25' alt=''></img>

    </div>
    
  </>
}
export default Homepage;