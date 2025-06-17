import "./KudosCard.css";
import { useState } from "react";

const DEFAULT_GIF = "https://i.gifer.com/4j.gif";

const KudosCard = ({ id }) => {
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/boards/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div className="board-card">
        <img src={DEFAULT_GIF} />
        <h2>Lorem Ipsum </h2>
        <p>Thank You</p>
        <div className="card-buttons">
          <button id="view"> View</button>
          <button
            id="delete"
            onClick={() => {
              handleDelete();
            }}
          >
            {" "}
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default KudosCard;
