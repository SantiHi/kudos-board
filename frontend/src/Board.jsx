import "./Board.css";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoardList from "./components/board/BoardList";
import CreatePostModal from "./components/board/CreatePostModal";
import CommentModal from "./components/board/CommentModal";
import { BASE_URL } from "./utils/reused";

import { useNavigate } from "react-router-dom";

const INIT_RELOAD = 0;
const INIT_ID = 1;

const Board = ({ currentBoardName, toggled, setToggled }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [reload, setReload] = useState(INIT_RELOAD);
  const [boardName, setBoardName] = useState("Title");
  const [isCreatePostVisible, setCreatePostVisibility] = useState(false);
  const [isCommentModalVisible, setCommentModalVisibility] = useState(false);
  const [postId, setPostId] = useState(INIT_ID);

  const { boardId } = useParams();

  const getName = async () => {
    const response = await fetch(`${BASE_URL}/boards/${boardId}`);
    const data = await response.json();
    setBoardName(data.title);
  };

  useEffect(() => {
    document.body.classList.toggle("toggled", toggled); // between light and dark mode
  }, [toggled]);

  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    const getCards = async () => {
      const response = await fetch(`${BASE_URL}/boards/${boardId}/posts`);
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
          navigate("/");
        }}
      >
        ←
      </button>
      <button
        className={`toggle-btn ${toggled ? "toggled" : ""}`}
        onClick={() => setToggled(!toggled)}
      >
        <div className="thumb"> </div>
      </button>
      <header>
        <h1>Kudos Board</h1>
        <h2 className="title-help"> {boardName} </h2>
        <button id="create" onClick={() => setCreatePostVisibility(true)}>
          Create Post
        </button>
      </header>
      {isCommentModalVisible && (
        <CommentModal
          setCommentModalVisibility={setCommentModalVisibility}
          setReload={setReload}
          postId={postId}
        />
      )}

      {isCreatePostVisible && (
        <CreatePostModal
          setCreatePostVisibility={setCreatePostVisibility}
          setReload={setReload}
        />
      )}
      <main>
        <BoardList
          visibleCards={visibleCards}
          setReload={setReload}
          setCommentModalVisibility={setCommentModalVisibility}
          setPostId={setPostId}
        />
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
