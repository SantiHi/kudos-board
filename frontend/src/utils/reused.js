const getAllBoards = async () => {
  const response = await fetch("http://localhost:3000/boards");
  const data = await response.json();
  return await data;
};

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://kudos-board-h5ce.onrender.com";

console.log({ BASE_URL });

export { getAllBoards, BASE_URL };
