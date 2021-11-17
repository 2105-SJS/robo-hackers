import React from 'react';
import {useState, useEffect} from 'react';
import {callAPI} from '../api/index';
import {AdminEditUser} from './index';


const RegisteredUsers = ({token, user}) => {
        const [allUsers, setAllUsers] = useState([]);

            const adminAllUsers = async () => {
                try {
                    const respObj = await callAPI({
                        url: 'users',
                        token
                    });
                    console.log("response>>>>", respObj)
                    if(respObj) {
                        setAllUsers(respObj.users);
                    }
                    console.log("ALL USERS after being set", allUsers)
                } catch (error) {
                    throw error;
                }
            }
        
            useEffect(() => {
                adminAllUsers();
            }, [])

            console.log("ALL USERS after after useEffect function", allUsers)
        
            return <>
            <h1 className='registered-users-title'>Currently Registered Users</h1>
            {
                allUsers.length > 0 ? allUsers.map((user) => <>
                <div className = 'users-admin'>
                    <span>User Name: {user.firstName} {user.lastName}</span>
                    <span>Email: {user.email}</span>
                    <span>User ID: {user.id}</span>
                    <span>User Username: {user.username}</span>
                    <span>User Adminstrator Status: {user.isAdmin.toString()}</span>
                    <img src = {user.imageURL} width = '150' height = '150'></img>
                    <AdminEditUser user={user} token={token}/>
                </div>
                </>) : null
            }
            </>

}


export default RegisteredUsers;