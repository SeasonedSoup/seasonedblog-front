import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

function Post() {
    const params = useParams();
    const location = useLocation();

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    async function fetchComments() {
        console.log("FETCHING COMMENTS...")
        const url = `http://localhost:8000/api/comments/${params.id}`

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result = await response.json()
        setComments(result);
    }

    useEffect(() => {
        fetchComments();
    }, [])

    async function createComment(e) {
        e.preventDefault();

        const url = `http://localhost:8000/api/comment/${params.id}`
        const token = localStorage.getItem("token")

        const response = await fetch(url, {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({text: comment})
        })

        const result = await response.json();
        console.log(result);
        setComments(prev => [...prev, result]);
        setComment("");
    }

    const {post} = location.state || {}
    return (
        <>
            <h1>{params.id} {post.title} {post.content}</h1>

            <h1>Comments</h1>
            {comments.length > 0 ? (
            comments.map((comment) => {
                return (
                    <div key={comment.id}>
                    <h2>{comment.text}</h2>
                    <h2>{comment.timestamp}</h2>
                </div>
                );
            })
            ) : (<p>No comments yet</p>)   
            }
            
            <form onSubmit={createComment}>
                <label htmlFor="comment">Comment:</label>
                <input type="text" id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button>Submit </button>    
            </form>     
        </>
    )
}

export default Post;