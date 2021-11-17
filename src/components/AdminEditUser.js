import React, {useState} from 'react';
import {callAPI} from '../api/index'


const AdminEditUser = ({user}) => {
    const [isAdmin, setIsAdmin] = useState(true);

    return  <>
        <label className='user-input'>Administrator: </label>
        <select onChange= {(event) => {
            if (event.target.value === 'true'){
                setIsAdmin(true);
            }
            if (event.target.value === 'false'){
                setIsAdmin(false);
            }
        }}>
        <option value='true'>Yes</option>
        <option value='false'>No</option>
        </select>
        <button type='button' onClick={async (event) => {
            console.log(isAdmin);
            console.log(user.id);
            const respObj = await callAPI({
                url:`/users/${user.id}`,
                method: "PATCH",
                body: {
                    isAdmin: isAdmin,
                }
            })
            console.log(respObj);
            if(respObj) {
                alert(`${user.username} adminstrator status set to ${isAdmin}`)
            }
            console.log("user object after becoming admin", user);
        }}>Submit Change</button>
    </>
}

export default AdminEditUser;