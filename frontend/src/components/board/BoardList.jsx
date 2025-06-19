import BoardCard from "./BoardCard";
import "./BoardList.css";

const BoardList = ({ visibleCards, setReload }) => {
  return (
    <div>
      <div className="kudos-list">
        {visibleCards.map((card) => {
          return (
            <BoardCard
              card={card}
              key={card.id}
              id={card.id}
              setReload={setReload}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BoardList;
