import KudosCard from "./KudosCard";
import { useState, useEffect } from "react";
import "./KudosList.css";
import { v4 as uuidv4 } from "uuid";

const KudosList = ({ visibleBoards }) => {
  return (
    <div>
      <div className="movie-list">
        {visibleBoards.map((board) => (
          <KudosCard board={board} key={board.id} id={board.id} />
        ))}
      </div>
    </div>
  );
};

export default KudosList;
