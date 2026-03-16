import { useParams } from "react-router";

function Post() {
    const params = useParams();
    return (
        <>
            <h1>{params.id}</h1>

            
        </>
    )
}

export default Post;