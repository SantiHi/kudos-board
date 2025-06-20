import KudosCard from "./KudosCard";
import "./KudosList.css";

const KudosList = ({
  visibleBoards,
  setCurrentBoardID,
  setCurrentBoardName,
  setReload,
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
            setReload={setReload}
          />
        ))}
      </div>
    </div>
  );
};

export default KudosList;
