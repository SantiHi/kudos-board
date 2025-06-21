import KudosCard from "./KudosCard";
import "./KudosList.css";

const KudosList = ({ visibleBoards, setCurrentBoardName, setReload }) => {
  return (
    <div>
      <div className="kudos-list">
        {visibleBoards.map((board) => (
          <KudosCard
            board={board}
            key={board.id}
            id={board.id}
            setCurrentBoardName={setCurrentBoardName}
            setReload={setReload}
          />
        ))}
      </div>
    </div>
  );
};

export default KudosList;
