import "./BoardCard.css";
import { useState } from "react";

const DEFAULT_GIF = "https://i.gifer.com/4j.gif";

const BoardCard = ({ card, id, setReload }) => {
  const addLikes = async () => {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
    });
    const data = await response.json();
    console.log(data);
    setReload((self) => self + 1);
  };

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
      </div>
    </>
  );
};

export default BoardCard;
