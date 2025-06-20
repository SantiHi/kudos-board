import BoardCard from "./BoardCard";
import "./BoardList.css";

const BoardList = ({
  visibleCards,
  setReload,
  setCommentModalVisibility,
  setPostId,
}) => {
  return (
    <div>
      <div className="pinned-list">
        {visibleCards.map((card) => {
          const pinned = card.pinned;
          if (pinned) {
            return (
              <BoardCard
                card={card}
                key={card.id}
                id={card.id}
                setReload={setReload}
                setCommentModalVisibility={setCommentModalVisibility}
                setPostId={setPostId}
              />
            );
          }
        })}
      </div>
      <div className="kudos-list">
        {visibleCards.map((card) => {
          const pinned = card.pinned;
          if (!pinned) {
            return (
              <BoardCard
                card={card}
                key={card.id}
                id={card.id}
                setReload={setReload}
                setCommentModalVisibility={setCommentModalVisibility}
                setPostId={setPostId}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default BoardList;
