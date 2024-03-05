import { useContext, useState } from "react";
import ActionButton from "./action.button";
import { GlobalContext, UserContext } from "../App";
import DeleteModal from "./delete.modal";

type PropsType = {
  id: number;
  reply: boolean;
  username: string;
  createdAt: string;
  avatar: string;
};

const CommentHeader = ({
  id,
  reply,
  username,
  createdAt,
  avatar,
}: PropsType) => {
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
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-[10px]">
          <img src={avatar} className="size-[32px]" />
          <h2 className="text-[#334253] text-[16px]">{username}</h2>
          <span className="text-[#67727E]">{createdAt}</span>
        </div>
        <div className="hidden sm:flex gap-[25px]">
          {username === user.username ? (
            <>
              <ActionButton type="delete" handler={() => setShow(true)} />
              <ActionButton type="edit" handler={editHandler} />
            </>
          ) : (
            <ActionButton type="reply" handler={replyHandler} />
          )}
        </div>
      </div>
    </>
  );
};

export default CommentHeader;
