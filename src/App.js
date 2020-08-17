import React from 'react';
//import posts from "./posts";
import Post from "./Post";
//import UserButton from "./UserButton";
import SelectUserDropdown from "./SelectUserDropdown";

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      filteredPosts:[],
      posts:[],
      activePost:null
    }
    
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/posts/")
    .then(resp=>resp.json())
    .then(data=>{
      this.setState({posts:data})
    })
  }

  whenUserIdSelected(user){
    let selectedUser = user;
    let filteredPosts = this.state.posts.filter(post=>post.userId === selectedUser)
    this.setState({filteredPosts:filteredPosts})
  }


  setActive(postId){
    this.setState({activePost:postId})
  }

  render(){

    let userIds = [...new Set(this.state.posts.map(post=>post.userId))]
    let filteredPosts = this.state.filteredPosts;

    if(filteredPosts.length === 0){
      filteredPosts = this.state.posts;
    }

    return (
      <div className="main-content">
        <div>
          {
          /*userIds.map(uid=><UserButton whenClicked={this.whenUserIdSelected.bind(this)} key={uid} user={uid}/>)*/
          }
          <SelectUserDropdown userIds={userIds} whenSelected={this.whenUserIdSelected.bind(this)} />
          <button onClick={()=>this.setState({filteredPosts:this.state.posts})} >reset</button>
        </div>

        <ul>
          {filteredPosts.map(post=>(
            <Post 
              setActive={this.setActive.bind(this)} 
              key={post.id} 
              post={post}
              isActive={post.id === this.state.activePost}
              />
            )
          )}
        </ul>
      </div>
  
    );
  }
}

export default App;
