import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from "./components/Search";

class App extends React.Component{
  state = {
    user: null,
  };

  fetchUserData = async username => {
    try{
      const res = await fetch(`https://api.github.com/users/${username}`);
      if(res.ok){
        const data = await res.json();
        return this.setState({
          user: data
        });
      }
    }
    catch(err){
      console.log(err);
    }
    
  };

  render(){
    return <Search fetchData={this.fetchUserData}/>;
  }
}

export default App;
