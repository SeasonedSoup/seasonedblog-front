import { useState } from "react";
import { useNavigate } from "react-router";
import {useAuth} from "./AuthToken/AuthContext"

function Homepage() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const {user, loading} = useAuth();

    async function fetchPosts() {
            const url = "http://localhost:8000/api/publishedPosts"

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json"          
                }
            })

            const posts = await response.json();
           
            setPosts(posts);
        }
    
    fetchPosts();

    function visitPost(id, post) {
        navigate(`/post/${id}`, {state: {post}});
    }

    if (loading) return <div>Loading...</div>;

    if (!user) return (
        <>
            <h1>PLEASE LOG IN IF YOU HAVE AN ACCOUNT</h1>
            <form action="">
                <label htmlFor="username">Username: </label>    
                <input type="text" id="username" name="username"/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password"/>
            </form>
            <a href="/signup">Sign up Here</a>
        </>
    )
    
    
    return (
        <>
            <h1>HELLO WELCOME TO SEASONED BLOG!, {user?.username}</h1>
            <a>VIEW THE BLOGS HERE!</a>
            {posts.map((post) => {
                return (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <button onClick={() => visitPost(post.id, post)}>View Post</button>
                    </div>
                )
            })}
        </>
    )
}

export default Homepage