import { useContext } from "react";
import ActionButton from "./action.button";
import { GlobalContext, UserContext } from "../App";
import { ModalContext } from "./comment";

type PropsType = {
  id: number;
  username: string;
  createdAt: string;
  avatar: string;
};

const CommentHeader = ({ id, username, createdAt, avatar }: PropsType) => {
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
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-[10px]">
          <img src={avatar} className="size-[32px]" />
          <h2 className="text-[#334253] text-[16px]">{username}</h2>
          <span className="text-[#67727E]">{createdAt}</span>
        </div>
        <div className="hidden sm:flex gap-[25px]">
          {username === user.username ? (
            <>
              <ActionButton type="delete" handler={() => setShowModal(true)} />
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
