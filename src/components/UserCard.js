import React from 'react';

const UserCard = ({user}) => {
    // console.log({user});
    return (<div className="card">
        <div className="card-body">
            <img src={user.avatar_url} alt="" />
            <h1>{user.name}</h1>
            <p>{user.company}</p>
            <p>{user.bio}</p>
        </div>
    </div>);
};

export default UserCard;
