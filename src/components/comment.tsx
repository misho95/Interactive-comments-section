import { useContext, useState } from "react";
import LikesCount from "./likes.count";
import ReplayContainer from "./replay.container";
import ReplyComment from "./reply.comment";
import { ActiveContext } from "../App";
import Reply from "../assets/Reply.png";

type CommentType = {
  id: number;
  likes: number;
  userId: number;
  userName: string;
  date: string;
  avatar: string;
  comment: string;
  sendTo?: {
    id: number;
    userName: string;
  };
};

type PropsType = {
  data: CommentType;
};

const Comment = ({ data }: PropsType) => {
  const { activeReplay, setActiveReplay, user } = useContext(ActiveContext);

  const handleSetActiveReply = () => {
    if (activeReplay === data.id) {
      setActiveReplay(null);
      return;
    }
    setActiveReplay(data.id);
  };

  const [localLikes, setLocalLikes] = useState(data.likes);

  return (
    <div className="flex flex-col gap-3">
      <article className="w-full bg-white rounded-[8px] py-3 px-5 flex gap-3">
        <div className="hidden sm:flex">
          <LikesCount likes={localLikes} onChange={setLocalLikes} />
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <img src={data.avatar} />
              <h3 className="text-[#334253] flex gap-3">
                {data.userName}
                {user.id === data.userId && (
                  <div className="text-white bg-[#5357B6] text-[13px] px-[5px] py-[2px] rounded-[2px] h-fit">
                    you
                  </div>
                )}
              </h3>
              <span className="text-[#67727E]">{data.date}</span>
            </div>
            <div className="hidden sm:flex">
              {user.id === data.userId ? (
                <div>edit/delete</div>
              ) : (
                <ReplyComment
                  title={"Reply"}
                  icon={Reply}
                  onClick={handleSetActiveReply}
                />
              )}
            </div>
          </div>
          <p>
            <span className="text-[#5357B6] p-1">
              {data.sendTo && `@${data.sendTo.userName}`}
            </span>
            {data.comment}
          </p>
          <div className="flex sm:hidden justify-between">
            <LikesCount likes={localLikes} onChange={setLocalLikes} />
            {user.id === data.userId ? (
              <div>edit/delete</div>
            ) : (
              <ReplyComment onClick={handleSetActiveReply} />
            )}
          </div>
        </div>
      </article>
      {activeReplay === data.id && <ReplayContainer title={"reply"} />}
    </div>
  );
};

export default Comment;
