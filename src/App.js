import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from "./components/Search";
import UserCard from "./components/UserCard";

class App extends React.Component{
  state = {
    user: null,
    error: null,
    loading: false,
  };

  fetchUserData = async username => {
    this.setState({
      loading: true,
    },async ()=>{
      try{
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // const res = await fetch(proxyurl+`https://api.github.com/users/${username}`);
        const res = await fetch(`https://api.github.com/users/${username}`);
        if(res.ok){
          const data = await res.json();
          return this.setState({
            user: data,
            loading: false,
          });
        }
        const error = (await res.json()).message;
        this.setState({
          error,
          loading: false,
        });
  
  
      }
      catch(err){
        this.setState({
          error: "There was some error",
          loading: false,
        });
      }
    });
    
    
  };

  render(){
    // console.log(this.state);
    const {error,loading,user} = this.state;
    return <div>
        <Search fetchData={this.fetchUserData}/>
        {(loading && (<p>Loading...</p>))}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && user && <UserCard user={user}/>}
    </div>
  }
}

export default App;
