import { useContext } from "react";
import ActionButton from "./action.button";
import Score from "./score";
import { GlobalContext, UserContext } from "../App";
import { ModalContext } from "./comment";

type PropsType = {
  id: number;
  username: string;
  score: {
    localScore: number;
    setLocalScore: (arg: number) => void;
  };
};

const CommentFooter = ({ id, username, score }: PropsType) => {
  const user = useContext(UserContext);

  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    return;
  }

  const { replyActive, setReplyActive, activeEdit, setActiveEdit } =
    globalContext;

  const replyHandler = () => {
    if (replyActive === id) {
      setReplyActive(null);
      return;
    }

    setReplyActive(id);
  };

  const editHandler = () => {
    if (activeEdit === id) {
      setActiveEdit(null);
      return;
    }

    setActiveEdit(id);
  };

  const { setShowModal } = useContext(ModalContext);

  return (
    <>
      <div className="flex justify-between items-center gap-[25px] sm:hidden">
        <Score score={score} />
        {user.username === username ? (
          <div className="flex gap-[18px]">
            <ActionButton type="delete" handler={() => setShowModal(true)} />
            <ActionButton type="edit" handler={editHandler} />
          </div>
        ) : (
          <ActionButton type="reply" handler={replyHandler} />
        )}
      </div>
    </>
  );
};

export default CommentFooter;
