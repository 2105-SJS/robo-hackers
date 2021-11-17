import React, {useState} from 'react';
import {callAPI} from '../api/index'


const AdminEditUser = ({user, token}) => {
    const [isAdmin, setIsAdmin] = useState(true);

    return  <>
    <span className='admin-change-option-form'>

        <label className='admin-user-input'>Administrator: </label>
        <select className='admin-selection' onChange= {(event) => {
            console.log(event.target.value);
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
        <button className="admin-submit-button" type='button' onClick={async (event) => {
            const respObj = await callAPI({
                url:`/users/${user.id}`,
                method: "PATCH",
                token,
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
    </span>
    </>
}

export default AdminEditUser;