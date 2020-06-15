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
        const { fetchData } = this.props;
        const{ username } = this.state;
        return(
            <div>
                <input type="text" value={username} name="username" placeholder="Enter Username" onChange={this.handleUsernameChange}></input>
                <button onClick={() => fetchData(username)} className="btn btn-success">Search</button>
            </div>
        );
    }
}

export default Search;