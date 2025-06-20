import { useState, useEffect } from "react";
import "./CreatePostModal.css";
import { useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_GIPHY_KEY;
const DEFAULT_GIF = "Enter GIF URL";
const DEFAULT_MODAL_CLASS = "createPost-details";
const SEARCH_MODAL_CLASS = "createPost-details2";
const CreatePostModal = ({ setCreatePostVisibility, setReload }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    imageURL: "",
    boardId: "",
  });
  const [gifSearch, setGifSearch] = useState("");
  const [showGifSearch, setShowGifSearch] = useState(false);
  const [gifArray, setGifArray] = useState([]);
  const [modalDetailsClass, setModalDetailsClass] =
    useState(DEFAULT_MODAL_CLASS);

  const { boardId } = useParams();

  const handleSearchChange = (event) => {
    setGifSearch(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleGIFSearch = async (event) => {
    setShowGifSearch(true);
    setModalDetailsClass(SEARCH_MODAL_CLASS);
    event.preventDefault();
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifSearch}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clip`
    );
    const data = await response.json();
    setGifArray(data.data);
  };

  const handleCreateBoard = (event) => {
    event.preventDefault();
    setCreatePostVisibility(false);
    console.log(formData);
    addcreatePost();
    setReload((self) => self + 1);
  };

  const addcreatePost = async () => {
    console.log(JSON.stringify(formData));
    const response = await fetch(`http://localhost:3000/boards/${boardId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    setReload((self) => self + 1);
  };

  const addNewPost = async () => {
    console.log(JSON.stringify(formData));
    const response = await fetch("http://localhost:3000/boards/", {
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
        className={modalDetailsClass}
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
              placeholder="Post Text"
              onChange={handleChange}
            ></textarea>
          </div>
          <div id="form-block-gif">
            <textarea
              name="search-gif"
              placeholder="Search GIFs"
              onChange={handleSearchChange}
            ></textarea>
            <button id="search-gifs" onClick={handleGIFSearch}>
              Search
            </button>
          </div>
          <div className={`gif-images ${showGifSearch ? "active" : ""}`}>
            {showGifSearch &&
              gifArray.map((image) => {
                return (
                  <img
                    key={image.id}
                    src={image.images.downsized.url}
                    onClick={() => {
                      setFormData((prevState) => ({
                        ...prevState,
                        ["imageURL"]: image.images.downsized.url,
                      }));
                    }}
                  />
                );
              })}
          </div>
          <div className="form-block">
            <textarea
              name="imageURL"
              placeholder={DEFAULT_GIF}
              value={formData.imageURL}
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
