import { useState, useEffect, useCallback } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar.jsx";
import NewBoardModal from "./components/NewBoardModal.jsx";
import KudosList from "./components/KudosList.jsx";

const App = () => {
  const [isNewBoardModalVisible, setNewBoardModalVisibility] = useState(false);
  const [visibleBoards, setVisibleBoards] = useState([]);

  const getBoards = useCallback(async () => {
    const response = await fetch("http://localhost:3000/boards");
    const data = await response.json();
    setVisibleBoards(data);
  });

  useEffect(() => {
    getBoards();
  }, [getBoards]);

  return (
    <div className="App">
      <header>
        <h1>Kudos Board</h1>
      </header>

      {isNewBoardModalVisible && (
        <NewBoardModal
          setNewBoardModalVisibility={setNewBoardModalVisibility}
        />
      )}
      <main>
        <div className="top-container">
          <SearchBar />
          <div className="select-drop">
            <select name="seach-form" className="select-drop">
              <option value="Sort">All</option>
              <option value="alphabetic">Recent</option>
              <option value="date-released">Celebration</option>
              <option value="rating">Thank You</option>
              <option value="rating">Inspiration </option>
            </select>
            <button id="new-board" onClick={setNewBoardModalVisibility}>
              Create New Board
            </button>
          </div>
        </div>
        <div className="bottom-container">
          <KudosList visibleBoards={visibleBoards} />
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

export default App;
