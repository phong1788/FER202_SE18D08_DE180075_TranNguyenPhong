import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [id]);

    if (!post) return <p>Bài viết không tồn tại</p>;

    return (
        <div className="p-4">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
}

export default PostDetail;
