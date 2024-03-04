import ActionButton from "./action.button";
import Score from "./score";

const CommentFooter = () => {
  const owner = true;

  return (
    <div className="flex justify-between items-center gap-[25px] sm:hidden">
      <Score />
      {owner ? (
        <div className="flex gap-[18px]">
          <ActionButton type="delete" />
          <ActionButton type="edit" />
        </div>
      ) : (
        <ActionButton type="reply" />
      )}
    </div>
  );
};

export default CommentFooter;
