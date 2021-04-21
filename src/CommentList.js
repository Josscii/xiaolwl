import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";

const COMMENTLISTURL =
  "https://m.weibo.cn/comments/hotflow?id=4467107636950632&mid=4467107636950632&max_id_type=0";

function CommentList() {
  const [comments, setComments] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(COMMENTLISTURL);
      const data = response.data;
      if (data.ok === 1) {
        setComments(data.data.data);
      }
    };

    fetchData();
  }, [refreshCount]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRefreshCount((rc) => rc + 1);
    }, 30000);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
