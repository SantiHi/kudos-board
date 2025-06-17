import { useState, useEffect } from "react";
import "./NewBoardModal.css";

const ModalOptions = Object.freeze({
  CATEGORY: "select-a-category",
  CELEBRATION: "celebration",
  THANK_YOU: "thank-you",
  INSPIRATION: "inspiration",
});

const NewBoardModal = ({ setNewBoardModalVisibility }) => {
  const [category, setCategory] = useState(ModalOptions.CATEGORY);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropChange = (event) => {
    event.preventDefault();
    setCategory(event.target.value);
    setFormData((data) => ({ ...data, ["category"]: event.target.value }));
  };

  const handleCreateBoard = (event) => {
    event.preventDefault();
    setNewBoardModalVisibility(false);
    console.log(formData);
    addNewBoard();
  };
  const addNewBoard = async () => {
    const response = await fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div
      onClick={() => setNewBoardModalVisibility(false)}
      className="newBoard-overlay2"
    >
      <div
        className="newBoard-details"
        onClick={(event) => event.stopPropagation()}
      >
        <p onClick={() => setNewBoardModalVisibility(false)}>X</p>
        <h2>New Board</h2>
        <form name="new-board">
          <div className="form-block">
            <label name="title"> Title</label>
            <textarea
              name="title"
              placeholder="Name of Board"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-block">
            <label name="dropdown"> Category</label>
            <select value={category} onChange={handleDropChange}>
              <option value={ModalOptions.CATEGORY}>Select a category</option>
              <option value={ModalOptions.CELEBRATION}>Celebration</option>
              <option value={ModalOptions.THANK_YOU}>Thank You</option>
              <option value={ModalOptions.INSPIRATION}>Inspiration</option>
            </select>
          </div>
          <div className="form-block">
            <label value="author"> Author </label>
            <textarea
              name="author"
              placeholder="Name"
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
        <button id="new-board" onClick={(event) => handleCreateBoard(event)}>
          Create Board
        </button>
      </div>
    </div>
  );
};
export default NewBoardModal;
