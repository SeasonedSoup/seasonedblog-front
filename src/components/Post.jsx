import { useState } from "react";
import { useLocation, useParams } from "react-router";

function Post() {
    const params = useParams();
    const location = useLocation();

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    async function fetchComments() {
        console.log("FETCHING COMMENTS...")
        const url = "http://localhost:8000/api/comments"
    }

    async function createComment(e) {
        e.preventDefault();

        const url = "http://localhost:8000/api/comment"
        const token = localStorage.getItem("token")

        const response = await fetch(url, {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({comment})
        })

        const result = await response.json();
        console.log(result);
    }

    const {post} = location.state || {}
    return (
        <>
            <h1>{params.id} {post.title} {post.content}</h1>

            <form onSubmit={createComment}>
                <label htmlFor="comment">Comment:</label>
                <input type="text" id="comment" name="comment" onChange={(e) => setComment(e.target.value)}/>
                <button>Submit </button>    
            </form>     
        </>
    )
}

export default Post;