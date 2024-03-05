import { useContext, useState } from "react";
import { CommentDataType, GlobalContext } from "../App";
import CommentFooter from "./comment.footer";
import CommentHeader from "./comment.header";
import Score from "./score";
import ReplyContainer from "./reply.container";

interface CommentOrReply extends CommentDataType {
  replyingTo?: string;
}

type PropsType = {
  data: CommentOrReply;
  reply?: boolean;
  handleReplyMessage: (id: number, message: string, reply: boolean) => void;
};

const Comment = ({ data, reply = false, handleReplyMessage }: PropsType) => {
  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    return;
  }
  const { replyActive, setReplyActive } = globalContext;

  const [localScore, setLocalScore] = useState<number>(data.score);

  const [replyMessage, setReplyMessage] = useState("");

  const handleReply = () => {
    handleReplyMessage(data.id, replyMessage, reply);
    setReplyMessage("");
    setReplyActive(null);
  };

  return (
    <div
      className={`w-full  ${
        reply ? "w-full" : "sm:w-[730px]"
      } flex flex-col gap-[25px]`}
    >
      <article className="flex gap-[25px] flex-col w-full min-h-[167px] bg-[#FFFFFF] p-[24px] rounded-[8px]">
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
            <p className="text-[#67727E]">
              {reply && (
                <span className="text-[#5357B6] text-[16px] pr-[10px] select-all">
                  @{data.replyingTo}
                </span>
              )}
              <span>{data.content}</span>
            </p>
          </div>
        </div>
        <CommentFooter
          username={data.user.username}
          score={{ localScore, setLocalScore }}
        />
      </article>
      {replyActive === data.id && (
        <ReplyContainer
          title="reply"
          buttonHandler={handleReply}
          content={{ value: replyMessage, onChange: setReplyMessage }}
        />
      )}
      {data.replies && data.replies.length > 0 && (
        <div className="flex flex-col border-l-2 pl-[43px] ml-[43px] border-[#E9EBF0] gap-[25px]">
          {data.replies.map((replie) => {
            return (
              <Comment
                key={replie.id}
                data={replie}
                reply
                handleReplyMessage={handleReplyMessage}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
