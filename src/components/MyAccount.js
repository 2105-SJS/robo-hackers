import React, {useState, useEffect} from 'react';
import { AddProduct } from './';

const MyAccount = ({ user, fetchProducts, setToken }) => {

  return <>
  <div className='myaccount-mainpage'>
    <div>
      {user.isAdmin ? <AddProduct user={user} fetchProducts={fetchProducts} setToken={setToken}/> : null}
    </div>
    <div>

    </div>
  </div>
  </>
}
export default MyAccount;