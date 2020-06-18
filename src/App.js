import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from "./components/Search";
import UserCard from "./components/UserCard";
import RepoCard from "./components/RepoCard";
import TestComponent from "./components/TestComponent";

const pageSize = 10;

class App extends React.Component{
  state = {
    user: null,
    repos:[],
    // userDataError: null,
    // reposError: null,
    error: null,
    loading: false,
    pageSize:10,
    page:1,
    fetchingRepos: false,
  };

  componentDidMount() {
    window.addEventListener('scroll',this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll',this.handleScroll);
  }

  handleScroll = () => {
    const currentScroll = Math.round(window.scrollY);
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // const maxScroll = document.body.scrollHeight;
    // console.log(currentScroll,maxScroll);
    const {page,pageSize,user} = this.state;

    if(maxScroll-currentScroll <= 100 && user && ((page-1) * pageSize) < user.public_repos) this.loadPage();
  }

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
    const {pageSize, page } = this.state; 
    const res = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`);
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
            page: this.state.page+1,
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

  loadPage = async () => {
    if(this.state.fetchingRepos === true) return;
    this.setState({fetchingRepos: true}, async ()=> {
      const {data,page} = await this.fetchRepos(this.state.user.login,this.state.page);

      if(data) 
      this.setState(state => ({
        repos:[...state.repos,...data],
        page: state.page+1,
        fetchingRepos: false,
      }));
    });
  };


  // handlePageChange = (page) => {
  //   this.setState({ page },()=>this.loadPage());
  // };

  // handlePageSizeChange = e => this.setState({
  //   pageSize: e.target.value,
  // },()=>this.loadPage());

  render(){
    // console.log(this.state);
    const {userDataError,reposError,loading,user,repos,page} = this.state;

    const renderRepos = !loading && !reposError && user && !!repos.length;

    return <div>
        <Search fetchData={this.fetchData}/>
        {(loading && (<p>Loading...</p>))}
        {userDataError && <p className="text-danger">{userDataError}</p>}
        {!loading && !userDataError && user && <UserCard user={user}/>}
        {reposError && <p className="text-danger">{reposError}</p>}

        {pageSize==='30' && 
          <TestComponent pageSize={pageSize} />
        }

        {renderRepos && (
          <React.Fragment>
              {/* {[...new Array(Math.ceil(user.public_repos/pageSize))].map((_,index) =>
                  <button key={index} className="btn btn-success mr-2" onClick={() => this.handlePageChange(index+1)}>{index+1}</button>
              )}

              <div className="d-inline-block mb-4">
                  <select className="form-control" onChange={this.handlePageSizeChange} value = {pageSize}>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                  </select>
              </div> */}

              {repos.map((repo,index) => <RepoCard key={repo.id} repo={repo}/>) }

              {/* {(((page-1) * pageSize) < user.public_repos) && (
                <button className="btn btn-success" onClick={this.loadMore}>Load More</button>
              )} */}
          </React.Fragment>
        )}

    </div>
  }
}

export default App;
