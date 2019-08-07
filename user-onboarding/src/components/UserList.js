import React from 'react';

function UserList ({userList}) {
    return (
        <div className="userList-wrapper">
        <h3>Other cool people who joined this service! </h3>
        <h5>This is absolutely not a breach of privacy.</h5>
        {userList.map(a => {
            return <p>{a.firstname} {a.lastname}</p>
        })}
        </div>
        
    )
}

export default UserList;