import { CommentDataType } from "../App";
import CommentFooter from "./comment.footer";
import CommentHeader from "./comment.header";
import Score from "./score";

type PropsType = {
  data: CommentDataType;
};

const Comment = ({ data }: PropsType) => {
  return (
    <article className="flex gap-[25px] flex-col w-[730px] min-h-[167px] bg-[#FFFFFF] p-[24px] rounded-[8px]">
      <div className="flex gap-[25px]">
        <div className="hidden sm:flex">
          <Score score={data.score} />
        </div>
        <div className="flex flex-col gap-[20px]">
          <CommentHeader
            username={data.user.username}
            createdAt={data.createdAt}
            avatar={data.user.image.png}
          />
          <p className="text-[#67727E]">{data.content}</p>
        </div>
      </div>
      <CommentFooter />
    </article>
  );
};

export default Comment;
