import { useState, useEffect, useCallback } from "react";
import "./Home.css";
import SearchBar from "./components/home/SearchBar.jsx";
import NewBoardModal from "./components/home/NewBoardModal.jsx";
import KudosList from "./components/home/KudosList.jsx";
import { BASE_URL } from "./utils/reused.js";

const ModalOptions = Object.freeze({
  ALL: "all",
  RECENT: "recent",
  CELEBRATION: "celebration",
  THANK_YOU: "thank-you",
  INSPIRATION: "inspiration",
});

const INIT_RELOAD = 0;

const Home = ({
  setCurrentBoardID,
  setCurrentBoardName,
  setToggled,
  toggled,
}) => {
  const [isNewBoardModalVisible, setNewBoardModalVisibility] = useState(false);
  const [visibleBoards, setVisibleBoards] = useState([]);
  const [reload, setReload] = useState(INIT_RELOAD);

  const getBoards = async () => {
    const response = await fetch(`${BASE_URL}/boards`);
    const data = await response.json();
    setVisibleBoards(data);
  };

  async function handleSortChange(event) {
    event.preventDefault();
    const response = await fetch(
      `${BASE_URL}/boards/category/${event.target.value}`
    );
    const data = await response.json();
    setVisibleBoards(data);
    console.log(data);
  }

  useEffect(() => {
    getBoards();
  }, [reload]);

  useEffect(() => {
    document.body.classList.toggle("toggled", toggled); // between light and dark mode
  }, [toggled]);

  return (
    <div className="Home">
      <header>
        <button
          className={`toggle-btn ${toggled ? "toggled" : ""}`}
          onClick={() => setToggled(!toggled)}
        >
          <div className="thumb"> </div>
        </button>
        <h1>Kudos Board</h1>
      </header>

      {isNewBoardModalVisible && (
        <NewBoardModal
          setNewBoardModalVisibility={setNewBoardModalVisibility}
          setReload={setReload}
        />
      )}
      <main className={`main ${toggled ? "toggled" : ""}`}>
        <div className="top-container">
          <SearchBar
            setVisibleBoards={setVisibleBoards}
            getAllBoards={getBoards}
          />
          <div className="select-drop">
            <select
              name="seach-form"
              className="select-drop"
              onChange={handleSortChange}
            >
              <option value={ModalOptions.ALL}>All</option>
              <option value={ModalOptions.RECENT}>Recent</option>
              <option value={ModalOptions.CELEBRATION}>Celebration</option>
              <option value={ModalOptions.THANK_YOU}>Thank You</option>
              <option value={ModalOptions.INSPIRATION}>Inspiration</option>
            </select>
            <button id="new-board" onClick={setNewBoardModalVisibility}>
              Create New Board
            </button>
          </div>
        </div>
        <div className="bottom-container">
          <KudosList
            visibleBoards={visibleBoards}
            setCurrentBoardID={setCurrentBoardID}
            setCurrentBoardName={setCurrentBoardName}
            setReload={setReload}
          />
        </div>
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

export default Home;
