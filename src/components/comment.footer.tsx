import { useContext, useState } from "react";
import ActionButton from "./action.button";
import Score from "./score";
import { GlobalContext, UserContext } from "../App";
import DeleteModal from "./delete.modal";

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
  const [show, setShow] = useState(false);
  const user = useContext(UserContext);

  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    return;
  }

  const {
    replyActive,
    setReplyActive,
    handleDelete,
    activeEdit,
    setActiveEdit,
  } = globalContext;

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

  return (
    <>
      {show && (
        <DeleteModal
          hide={() => setShow(false)}
          handler={() => handleDelete(id, reply)}
        />
      )}
      <div className="flex justify-between items-center gap-[25px] sm:hidden">
        <Score score={score} />
        {user.username === username ? (
          <div className="flex gap-[18px]">
            <ActionButton type="delete" handler={() => setShow(true)} />
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
