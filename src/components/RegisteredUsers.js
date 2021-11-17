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
            <h1>ALL USERS :----</h1>
            {
                allUsers.length > 0 ? allUsers.map((user) => <>
                <div>
                    <span>{user.firstName} {user.lastName}</span>
                    <span>{user.email}</span>
                    <img src = {user.imageURL} width = '75' height = '75'></img>
                </div>
                <AdminEditUser user={user}/>
                </>) : null
            }
            </>

}


export default RegisteredUsers;