import KudosCard from "./KudosCard";
import "./KudosList.css";

const KudosList = ({
  visibleBoards,
  setCurrentBoardID,
  setCurrentBoardName,
}) => {
  return (
    <div>
      <div className="kudos-list">
        {visibleBoards.map((board) => (
          <KudosCard
            board={board}
            key={board.id}
            id={board.id}
            setCurrentBoardID={setCurrentBoardID}
            setCurrentBoardName={setCurrentBoardName}
          />
        ))}
      </div>
    </div>
  );
};

export default KudosList;
