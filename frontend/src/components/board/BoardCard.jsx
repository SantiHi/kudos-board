import "./BoardCard.css";
import { useState } from "react";

const DEFAULT_GIF = "https://i.gifer.com/4j.gif";

const BoardCard = ({ card, id, setReload }) => {
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    setReload((self) => self + 1);
  };

  return (
    <>
      <div className="post-card">
        <img src={card.imageURL ? card.imageURL : DEFAULT_GIF} />
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <div className="post-buttons">
          <button id="view"> Upvote</button>
          <button id="delete" onClick={handleDelete}>
            {" "}
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardCard;
