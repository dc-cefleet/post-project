import React from "react";

const Post = ({post})=>{
    return(
        <li id={'post_'+post.id}>
            <h3>{post.title}</h3>
            <div>{post.body}</div>
            <aside>{post.userId}</aside>
        </li>
    )
}

export default Post;