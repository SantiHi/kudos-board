import "./KudosCard.css";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const DEFAULT_GIF = "https://i.gifer.com/4j.gif";

const KudosCard = ({
  board,
  id,
  setCurrentBoardID,
  setCurrentBoardName,
  setReload,
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/boards/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    setReload((self) => self + 1);
  };

  const handleView = () => {
    navigate(`/boards/${id}`);
    setCurrentBoardID(id);
    setCurrentBoardName(board.title);
  };

  return (
    <>
      <div className="board-card">
        <img src={board.imageURL ? board.imageURL : DEFAULT_GIF} />
        <h2>{board.title}</h2>
        <p>{board.category}</p>
        <div className="card-buttons">
          <button id="view" onClick={handleView}>
            {" "}
            View
          </button>
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
