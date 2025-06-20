import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./SearchBar.css";
import { BASE_URL } from "../../utils/reused";

const SearchBar = ({ setVisibleBoards, getAllBoards }) => {
  const [inputValue, setInputValue] = useState("");

  const search = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/boards/query/${inputValue}`);
    const data = await response.json();
    console.log(data);
    setVisibleBoards(data);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    // JSX code to render component.
    <div className="search-container">
      <form id="seachBar" onSubmit={(e) => search(e)}>
        <input
          placeholder="Look up Kudos!"
          name="searchBar"
          value={inputValue}
          onChange={(e) => handleChange(e)}
        ></input>
        <button onClick={(e) => search(e)}>Search</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setInputValue("");
            getAllBoards();
          }}
        >
          {" "}
          Clear{" "}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
