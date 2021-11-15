
import React, {useEffect, useState} from 'react';
import {callAPI} from '../api';

const Users = ({token}) => {
    const [allUsers, setAllUsers] = useState([]);

    const adminAllUsers = async () => {
        try {
            const respObj = await callAPI({
                url: 'users',
                token
            });
            console.log("response>>>>", respObj)
            if(respObj) {
                setAllUsers(respObj);
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        adminAllUsers();
    }, [])

    return <>
    {
        allUsers.map((user) => <>
        <div>
            <span>{user.firstName} {user.lastName}</span>
            <span>user.email</span>
            <img src = {user/imageURL} width = '75' height = '75'></img>
        </div>
        </>)
    }
    </>
}

export default Users;