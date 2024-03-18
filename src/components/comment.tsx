import { createContext, useContext, useEffect, useState } from "react";
import { CommentDataType, GlobalContext } from "../App";
import CommentFooter from "./comment.footer";
import CommentHeader from "./comment.header";
import Score from "./score";
import ReplyContainer from "./reply.container";
import Button from "./button";
import DeleteModal from "./delete.modal";
import { animated, useTransition } from "@react-spring/web";

interface CommentOrReply extends CommentDataType {
  replyingTo?: string;
}

type PropsType = {
  data: CommentOrReply;
  reply?: boolean;
};

export const ModalContext = createContext<any>(null);

const Comment = ({ data, reply = false }: PropsType) => {
  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    return;
  }
  const {
    replyActive,
    setReplyActive,
    handleReplyMessage,
    activeEdit,
    handleEdit,
    handleDelete,
  } = globalContext;

  const [localScore, setLocalScore] = useState<number>(data.score);

  const [editInput, setEditInput] = useState("");

  const [replyMessage, setReplyMessage] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleReply = () => {
    handleReplyMessage(data.id, replyMessage, reply);
    setReplyMessage("");
    setReplyActive(null);
  };

  useEffect(() => {
    setEditInput(data.content);
  }, [activeEdit]);

  const transition = useTransition([1], {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
    config: {
      duration: 300,
    },
  });

  return (
    <>
      {showModal && (
        <DeleteModal
          hide={() => setShowModal(false)}
          handler={() => handleDelete(data.id, reply)}
        />
      )}

      {transition((style) => (
        <animated.div
          style={style}
          className={`w-full  ${
            reply ? "w-full" : "sm:w-[730px]"
          } flex flex-col gap-[25px]`}
        >
          <ModalContext.Provider value={{ showModal, setShowModal }}>
            <article
              id={`${data.user.username}`}
              className="flex gap-[25px] flex-col w-full min-h-[167px] bg-[#FFFFFF] p-[24px] rounded-[8px]"
            >
              <div className="flex gap-[25px]">
                <div className="hidden sm:flex">
                  <Score score={{ localScore, setLocalScore }} />
                </div>
                <div className="flex flex-col gap-[20px] w-full">
                  <CommentHeader
                    id={data.id}
                    username={data.user.username}
                    createdAt={data.createdAt}
                    avatar={data.user.image.png}
                  />
                  {activeEdit === data.id ? (
                    <div className="flex flex-col gap-[25px] items-end">
                      <textarea
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        className="w-full h-[96px] p-[17px] border-[1px] border-[#E9EBF0] rounded-[8px] resize-none focus:outline-[#5357B6] text-[#67727E]"
                      />
                      <Button
                        title="update"
                        handler={() => handleEdit(data.id, editInput, reply)}
                      />
                    </div>
                  ) : (
                    <p className="text-[#67727E]">
                      {reply && (
                        <span className="text-[#5357B6] text-[16px] pr-[10px]">
                          <a href={`#${data.replyingTo}`}>@{data.replyingTo}</a>
                        </span>
                      )}
                      <span>{data.content}</span>
                    </p>
                  )}
                </div>
              </div>
              <CommentFooter
                id={data.id}
                username={data.user.username}
                score={{ localScore, setLocalScore }}
              />
            </article>
          </ModalContext.Provider>
          <ReplyContainer
            title="reply"
            buttonHandler={handleReply}
            content={{ value: replyMessage, onChange: setReplyMessage }}
            open={replyActive === data.id}
          />
          {data.replies && data.replies.length > 0 && (
            <div className="flex flex-col border-l-2 pl-[15px] sm:pl-[43px] ml-[15px] sm:ml-[43px] border-[#E9EBF0] gap-[25px]">
              {data.replies.map((replie) => {
                return <Comment key={replie.id} data={replie} reply />;
              })}
            </div>
          )}
        </animated.div>
      ))}
    </>
  );
};

export default Comment;
