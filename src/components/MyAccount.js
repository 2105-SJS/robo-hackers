import React from 'react';
import { AddProduct } from './';

const MyAccount = ({ user, fetchProducts, setToken }) => {
  return <>
    {user.isAdmin ? <AddProduct user={user} fetchProducts={fetchProducts} setToken={setToken}/> : null}
  </>
}
export default MyAccount;