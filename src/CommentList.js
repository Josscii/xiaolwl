import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import loaderSvg from "./oval.svg";

const COMMENTLISTURL =
  "/comments/hotflow?id=4467107636950632&mid=4467107636950632&max_id_type=0";

function CommentList() {
  const [comments, setComments] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);

  const calculateNewComments = (last, current) => {
    if (last.length === 0) {
      return current.map((comment) => {
        comment.isNew = false;
        return comment;
      });
    } else {
      return current.map((comment) => {
        comment.isNew = !last.find((com) => com.id === comment.id);
        return comment;
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(COMMENTLISTURL);
      const data = response.data;
      if (data.ok === 1) {
        const currentComments = data.data.data;
        setComments((lastComments) =>
          calculateNewComments(lastComments, currentComments)
        );
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

  const firstLoading = comments.length === 0;

  return (
    <div>
      {firstLoading ? (
        <img className="mx-auto w-5 h-5" alt="loading" src={loaderSvg} />
      ) : (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
}

export default CommentList;
