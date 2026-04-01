import { useState } from "react";

function CommentForm({createComment}) {
    const [comment, setComment] = useState("");
    
    function handleSubmit(e) {
        e.preventDefault(); 
        createComment(comment);
        setComment("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment">Comment:</label>
            <input type="text" id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
            <button>Submit </button>    
        </form> 
    )
}

export default CommentForm;