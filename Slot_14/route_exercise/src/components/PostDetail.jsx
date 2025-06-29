import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
    const { id } = useParams();  // Lấy tham số ID từ URL
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Fetch dữ liệu từ file posts.json trong thư mục public
        fetch('/posts.json')
            .then((response) => response.json())
            .then((data) => {
                // Tìm bài viết theo ID
                const foundPost = data.find(p => p.id === id);
                setPost(foundPost);
            })
            .catch((error) => console.error('Error loading post:', error));
    }, [id]);  // Mỗi khi ID thay đổi, gọi lại API

    if (!post) {
        return <h2>Post not found</h2>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
}

export default PostDetail;