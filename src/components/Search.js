import React from 'react';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:props.username|| "",
        }
    }
    

    handleUsernameChange = e => {
        const value = e.target.value;
        this.setState({ username: value });
    };

    render(){
        const { history } = this.props;
        const{ username } = this.state;
        return(
            <div>
                <input type="text" value={username} name="username" placeholder="Enter Username" onChange={this.handleUsernameChange}></input>
                <button onClick={() => history.push(`/${username}`)} className="btn btn-success">Search</button>
            </div>
        );
    }
}

export default withRouter(Search);