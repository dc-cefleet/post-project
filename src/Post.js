import React from "react";

class Post extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            comments:[]
        }        
    }

    componentDidUpdate(){
        const {post:{id}, isActive} = this.props;
        
        if(!this.state.comments.length > 0 && isActive){
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(resp=>resp.json())
            .then(data=>{
                this.setState({comments:data})
            })
        }
    }
    
    render(){

        const {post, setActive, isActive} = this.props;
        const {comments} = this.state;

        if (comments.length > 0) console.log(comments);

        if(isActive){
            console.log('I am active and my id is '+post.id)
        }
        //const post = this.props.post;
        //const setActive = this.props.setActive; 

        return(
            <li onClick={()=>setActive(post.id)} id={'post_'+post.id}>
                <h3>{post.title}</h3>
                <div>{post.body}</div>
                <aside>{post.userId}</aside>
                <div>{isActive &&
                    comments.map(comment=><div key={comment.id}>{comment.id}</div>)
                }</div>
            </li>
        )
    }
}

export default Post;