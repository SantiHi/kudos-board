import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home.jsx";
import Board from "./Board.jsx";
import { useState } from "react";

const INIITIAL_STATE = 0;

const App = () => {
  const [currentBoardID, setCurrentBoardID] = useState(INIITIAL_STATE);
  const [currentBoardName, setCurrentBoardName] = useState(INIITIAL_STATE);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <Home
              setCurrentBoardID={setCurrentBoardID}
              setCurrentBoardName={setCurrentBoardName}
            />
          }
        />
        <Route
          path="/boards/:boardId"
          element={<Board currentBoardName={currentBoardName} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
