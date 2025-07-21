import React, { useState, useEffect } from "react";

const PostList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sử dụng useEffect để thực hiện tác vụ fetching khi component mount
  useEffect(() => {
    // Định nghĩa hàm async để thực hiện fetch dữ liệu
    const fetchData = async () => {
      try {
        // Gửi yêu cầu fetch và chờ kết quả
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu");
        }
        const data = await response.json();  // Chuyển dữ liệu về dạng JSON
        setData(data);  // Lưu dữ liệu vào state
        setLoading(false);  // Đánh dấu việc tải xong
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();  // Gọi hàm fetchData khi component mount
  }, []);  // Chạy 1 lần khi component được mount

  if (loading) {
    return <div>Đang tải...</div>;  // Hiển thị thông báo đang tải
  }

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
