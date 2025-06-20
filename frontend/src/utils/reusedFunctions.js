const getAllBoards = async () => {
  const response = await fetch("http://localhost:3000/boards");
  const data = await response.json();
  return await data;
};

export { getAllBoards };
