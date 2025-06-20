import "./BoardCard.css";
import { useState } from "react";
import { BASE_URL } from "../../utils/reused";

import pushPin from "../../assets/push-pin.svg";

const DEFAULT_GIF = "https://i.gifer.com/4j.gif";

const BoardCard = ({
  card,
  id,
  setReload,
  setCommentModalVisibility,
  setPostId,
}) => {
  const makePinned = async () => {
    const response = await fetch(`${BASE_URL}/posts/${id}/pin`, {
      method: "PUT",
    });
    const data = await response.json();
    setReload((self) => self + 1);
  };

  const addLikes = async () => {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PUT",
    });
    const data = await response.json();
    console.log(data);
    setReload((self) => self + 1);
  };

  const handleDelete = async () => {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    setReload((self) => self + 1);
  };

  const handleComment = async () => {
    console.log("clicked!");
    setCommentModalVisibility(true);
    setPostId(id);
  };

  return (
    <>
      <div className={`post-card ${card.pinned ? "clicked" : ""}`}>
        <span
          className={`pin ${card.pinned ? "clicked" : ""}`}
          onClick={makePinned}
        >
          📌
        </span>
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <img src={card.imageURL ? card.imageURL : DEFAULT_GIF} />
        <div className="post-buttons">
          <button id="view" onClick={addLikes}>
            {`Upvotes: ${card.upvotes}`}
          </button>
          <button id="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <button id="comment" onClick={handleComment}>
          Comment
        </button>
      </div>
    </>
  );
};

export default BoardCard;
