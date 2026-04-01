import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import CommentForm from "./CommentForm";
import { API_URL } from "../apiUrl";

function Post() {
    const params = useParams();
    const location = useLocation();
    const [comments, setComments] = useState([]);


    useEffect(() => {
        async function fetchComments() {
            console.log("FETCHING COMMENTS...")
            const url = `${API_URL}/api/comments/${params.id}`

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const result = await response.json()
            setComments(result);
        }
        fetchComments();
    }, [params.id])

    async function createComment(comment) {
        console.log(comment)

        const url = `${API_URL}/api/comment/${params.id}`
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
            
            <CommentForm createComment={createComment}/>
        </>
    )
}

export default Post;