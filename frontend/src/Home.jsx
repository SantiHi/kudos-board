import { useState, useEffect, useCallback } from "react";
import "./Home.css";
import SearchBar from "./components/home/SearchBar.jsx";
import NewBoardModal from "./components/home/NewBoardModal.jsx";
import KudosList from "./components/home/KudosList.jsx";
import { getAllBoards } from "./utils/reusedFunctions.js";

const ModalOptions = Object.freeze({
  ALL: "all",
  RECENT: "recent",
  CELEBRATION: "celebration",
  THANK_YOU: "thank-you",
  INSPIRATION: "inspiration",
});

const INIT_RELOAD = 0;

const Home = ({ setCurrentBoardID, setCurrentBoardName }) => {
  const [isNewBoardModalVisible, setNewBoardModalVisibility] = useState(false);
  const [visibleBoards, setVisibleBoards] = useState([]);
  const [reload, setReload] = useState(INIT_RELOAD);

  const getBoards = async () => {
    const response = await fetch("http://localhost:3000/boards");
    const data = await response.json();
    setVisibleBoards(data);
  };

  async function handleSortChange(event) {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:3000/boards/category/${event.target.value}`
    );
    const data = await response.json();
    setVisibleBoards(data);
    console.log(data);
  }

  useEffect(() => {
    getBoards();
  }, [reload]);

  return (
    <div className="Home">
      <header>
        <h1>Kudos Board</h1>
      </header>

      {isNewBoardModalVisible && (
        <NewBoardModal
          setNewBoardModalVisibility={setNewBoardModalVisibility}
          setReload={setReload}
        />
      )}
      <main>
        <div className="top-container">
          <SearchBar
            setVisibleBoards={setVisibleBoards}
            getAllBoards={getBoards}
          />
          {/* 
                        <select value={category} onChange={handleDropChange}>
                <option value={ModalOptions.CATEGORY}>Select a category</option>
                <option value={ModalOptions.CELEBRATION}>Celebration</option>
                <option value={ModalOptions.THANK_YOU}>Thank You</option>
                <option value={ModalOptions.INSPIRATION}>Inspiration</option>
              </select> */}
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
