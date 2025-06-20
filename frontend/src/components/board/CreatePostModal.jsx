import { useState, useEffect } from "react";
import "./CreatePostModal.css";

const DEFAULT_GIF = "Enter GIF URL";

//   author      String
//   imageURL    String
//   upvotes     Int
//   boardId     Int
//   title       String
//   description String

const CreatePostModal = ({ setCreatePostVisibility }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    imageURL: "",
    boardId: "",
  });

  const doSomethingElse = () => {
    console.log("somthing");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCreateBoard = (event) => {
    event.preventDefault();
    setCreatePostVisibility(false);
    console.log(formData);
    addcreatePost();
  };
  const addcreatePost = async () => {
    console.log(JSON.stringify(formData));
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
      onClick={() => setCreatePostVisibility(false)}
      className="createPost-overlay2"
    >
      <div
        className="createPost-details"
        onClick={(event) => event.stopPropagation()}
      >
        <p onClick={() => setCreatePostVisibility(false)}>X</p>
        <h2>New Post</h2>
        <form name="new-board" id="bob">
          <div className="form-block">
            <textarea
              name="title"
              placeholder="Post Title"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-block">
            <textarea
              name="description"
              placeholder="Post Description"
              onChange={handleChange}
            ></textarea>
          </div>
          <div id="form-block-gif">
            <textarea
              name="search-gif"
              placeholder="Search GIFs"
              onChange={doSomethingElse}
            ></textarea>
            <button id="search-gifs">Search</button>
          </div>
          <div className="form-block">
            <textarea
              name="imageURL"
              placeholder={DEFAULT_GIF}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-block">
            <textarea
              name="author"
              placeholder="Enter Author Name (optional)"
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
        <button id="new-board" onClick={(event) => handleCreateBoard(event)}>
          Create Post
        </button>
      </div>
    </div>
  );
};
export default CreatePostModal;
