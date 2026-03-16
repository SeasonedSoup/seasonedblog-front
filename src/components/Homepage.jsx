import { useState } from "react";
import { useNavigate } from "react-router";

function Homepage() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();


    async function fetchPosts() {
            const url = "http://localhost:8000/api/publishedPosts"

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json"          
                }
            })

            const posts = await response.json();
           
            setPosts(posts);
            setUnpublishedPosts(unpublished);
            setLoading(false)
        }
    
    fetchPosts();

    function visitPost(id) {
        navigate(`/post/${id}`);
    }
    return (
        <>
            <h1>HELLO WELCOME TO SEASONED BLOG!!</h1>
            <a>VIEW THE BLOGS HERE!</a>
            {posts.map((post) => {
                return (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <button onClick={() => visitPost(post.id)}>View Post</button>
                    </div>
                )
            })}
        </>
    )
}

export default Homepage