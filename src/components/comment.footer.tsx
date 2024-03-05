import { useContext } from "react";
import ActionButton from "./action.button";
import Score from "./score";
import { GlobalContext, UserContext } from "../App";

type PropsType = {
  id: number;
  reply: boolean;
  username: string;
  score: {
    localScore: number;
    setLocalScore: (arg: number) => void;
  };
};

const CommentFooter = ({ id, reply, username, score }: PropsType) => {
  const user = useContext(UserContext);

  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    return;
  }

  const { replyActive, setReplyActive, handleDelete } = globalContext;

  const replyHandler = () => {
    if (replyActive === id) {
      setReplyActive(null);
      return;
    }

    setReplyActive(id);
  };

  return (
    <div className="flex justify-between items-center gap-[25px] sm:hidden">
      <Score score={score} />
      {user.username === username ? (
        <div className="flex gap-[18px]">
          <ActionButton type="delete" handler={() => handleDelete(id, reply)} />
          <ActionButton type="edit" />
        </div>
      ) : (
        <ActionButton type="reply" handler={replyHandler} />
      )}
    </div>
  );
};

export default CommentFooter;
