import React from 'react';

class Search extends React.Component {
    state={
        username: "",
    }

    handleUsernameChange = e => {
        const value = e.target.value;
        this.setState({ username: value });
    };

    render(){
        const{ username } = this.state;
        return <input type="text" value={username} name="username" placeholder="Enter Username" onChange={this.handleUsernameChange}></input>;
    }
}

export default Search;