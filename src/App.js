import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from "./components/Search";
import UserCard from "./components/UserCard";

class App extends React.Component{
  state = {
    user: null,
    repos:[],
    // userDataError: null,
    // reposError: null,
    error: null,
    loading: false,
  };

  fetchUserData = async(username) => {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const res = await fetch(proxyurl+`https://api.github.com/users/${username}`);
    const res = await fetch(`https://api.github.com/users/${username}`);
    if(res.ok){
      const data = await res.json();
      return {data};
    }
    const error = (await res.json()).message;
    return {error};
  }

  fetchRepos = async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}/repos?page=1`);
    if(res.ok){
      const data = await res.json();
      return {data};
    }
    const error = (await res.json()).message;
    return {error};
  }
  
  fetchData = async username => {
    this.setState({
      loading: true,
    },async ()=>{
      try{
        const [ user,repos] = await Promise.all([
          this.fetchUserData(username),
          this.fetchRepos(username),
        ]);

        if(user.data!== undefined && repos.data!== undefined){
          return this.setState({
            user:user.data,
            repos:repos.data,
            loading: false,
          });
        }

        this.setState({
          userDataError: user.error,
          reposError: repos.error,
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
    const {userDataError,reposError,loading,user} = this.state;
    return <div>
        <Search fetchData={this.fetchData}/>
        {(loading && (<p>Loading...</p>))}
        {userDataError && <p className="text-danger">{userDataError}</p>}
        {!loading && !userDataError && user && <UserCard user={user}/>}
        {reposError && <p className="text-danger">{reposError}</p>}
    </div>
  }
}

export default App;
