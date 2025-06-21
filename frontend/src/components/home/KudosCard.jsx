import "./KudosCard.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/reused";
import { useState } from "react";

const DEFAULT_GIF = "https://i.gifer.com/4j.gif";

const KudosCard = ({ board, id, setCurrentBoardName, setReload }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await fetch(`${BASE_URL}/boards/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    setReload((self) => self + 1);
  };

  const handleView = () => {
    navigate(`/boards/${id}`);
    setCurrentBoardName(board.title);
  };

  return (
    <>
      <div className="board-card">
        <div className="image">
          <img
            src={board.imageURL ? board.imageURL : DEFAULT_GIF}
            alt="funny gif or image"
          />
        </div>
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
