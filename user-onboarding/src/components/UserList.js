import React from 'react';

function UserList ({userList}) {
    return (
        <div className="userList-wrapper">
        <h3>Other cool people who joined this service! </h3>
        <h5>This is absolutely not a breach of privacy.</h5>
        <ul>
        {userList.map(a => {
            return <li key={a.id}>{a.firstname} {a.lastname}</li>
        })}
        </ul>
        
        </div>
        
    )
}

export default UserList;