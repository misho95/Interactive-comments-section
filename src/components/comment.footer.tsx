import { useContext } from "react";
import ActionButton from "./action.button";
import Score from "./score";
import { UserContext } from "../App";

type PropsType = {
  username: string;
  score: {
    localScore: number;
    setLocalScore: (arg: number) => void;
  };
};

const CommentFooter = ({ username, score }: PropsType) => {
  const user = useContext(UserContext);

  return (
    <div className="flex justify-between items-center gap-[25px] sm:hidden">
      <Score score={score} />
      {user.username === username ? (
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
