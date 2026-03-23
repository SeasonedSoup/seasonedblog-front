import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {useAuth} from "./AuthToken/AuthContext"

function Homepage() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const {user, loading, verifyAuth} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
    useEffect(() => {
        fetchPosts();
    }, [])
    function visitPost(id, post) {
        navigate(`/post/${id}`, {state: {post}});
    }

    async function login(e) {
        e.preventDefault();
        console.log("logging in")
        const url = "http://localhost:8000/api/login"

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json" 
                },
                body: JSON.stringify({
                    email,
                    password
                }) 
            });

            console.log(response);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem("token", data.token)

            console.log("You got a token!")
            await verifyAuth();
            navigate("/")
        } catch (err) {
            console.error(err);
            return alert("Error:", err)
        }
    }

    if (loading) return <div>Loading...</div>;

    if (!user) return (
        <>
            <h1>PLEASE LOG IN IF YOU HAVE AN ACCOUNT</h1>
            <form onSubmit={login}>
                <label htmlFor="email">Email: </label>    
                <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <button>Submit</button>
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