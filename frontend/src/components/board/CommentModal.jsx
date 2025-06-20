import { useState, useEffect } from "react";
import "./CommentModal.css";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/reused";

const DEFAULT_COMMENT = "ex: such a cool post!";
const DEFAULT_LOAD = 0;

const CommentModal = ({ setCommentModalVisibility, setReload, postId }) => {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [loadComments, setLoadComments] = useState(DEFAULT_LOAD);

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(`${BASE_URL}/posts/${postId}`);
      const data = await response.json();
      setAllComments(data);
      if ((await data) != null) {
        setCommentsVisible(true);
      }
    };
    getComments();
  }, [loadComments]);

  const newComment = async (event) => {
    event.preventDefault();
    const response = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author: author, comment }),
    });
    setComment("");
    setLoadComments((self) => self + 1);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  return (
    <div
      onClick={() => {
        setCommentModalVisibility(false);
      }}
      className="comment-overlay"
    >
      <div
        className="comment-details"
        onClick={(event) => event.stopPropagation()}
      >
        <p
          onClick={() => {
            setCommentModalVisibility(false);
          }}
        >
          X
        </p>
        <h2>Comments</h2>
        <div className={`gif-images`}></div>
        <div className="comment-container">
          {commentsVisible &&
            allComments.map((commentPost) => {
              return (
                <div className="comment-post" id={commentPost.id}>
                  {commentPost.author ? `${commentPost.author}: ` : ""}
                  {commentPost.comment}
                </div>
              );
            })}
        </div>
        <form name="new-board" id="bob">
          <div className="form-block">
            <textarea
              name="comment"
              placeholder={DEFAULT_COMMENT}
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <div className="form-block">
            <textarea
              name="author"
              placeholder="Author (optional)"
              value={author}
              onChange={handleAuthorChange}
            ></textarea>
          </div>
        </form>
        <button id="new-post-button" onClick={(event) => newComment(event)}>
          Comment
        </button>
      </div>
    </div>
  );
};
export default CommentModal;
