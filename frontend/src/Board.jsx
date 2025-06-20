import "./Board.css";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoardList from "./components/board/BoardList";
import CreatePostModal from "./components/board/CreatePostModal";

import { useNavigate } from "react-router-dom";

const INIT_RELOAD = 0;

const Board = ({ currentBoardName }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [reload, setReload] = useState(INIT_RELOAD);
  const [boardName, setBoardName] = useState("Title");
  const [isCreatePostVisible, setCreatePostVisibility] = useState(false);

  const { boardId } = useParams();

  const getName = async () => {
    const response = await fetch(`http://localhost:3000/boards/${boardId}`);
    const data = await response.json();
    setBoardName(data.title);
  };

  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    const getCards = async () => {
      const response = await fetch(
        `http://localhost:3000/boards/${boardId}/posts`
      );
      const data = await response.json();
      setVisibleCards(data);
      console.log(data);
    };
    getCards();
  }, [reload]);

  const navigate = useNavigate();

  return (
    <div className="Board">
      <button
        className="arrow"
        onClick={() => {
          navigate("/home");
        }}
      >
        ←
      </button>
      <header>
        <h1>Kudos Board</h1>
        <h2> {boardName} </h2>
        <button id="create" onClick={() => setCreatePostVisibility(true)}>
          Create Post
        </button>
      </header>
      {isCreatePostVisible && (
        <CreatePostModal
          setCreatePostVisibility={setCreatePostVisibility}
          setReload={setReload}
        />
      )}
      <main>
        <BoardList visibleCards={visibleCards} setReload={setReload} />
      </main>
      <footer>
        <h4> © 2025 Santiago Criado |</h4>
        <a href="https://github.com/SantiHi/flixster-starter" target="_blank">
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default Board;
