import ActionButton from "./action.button";

type PropsType = {
  username: string;
  createdAt: string;
  avatar: string;
};

const CommentHeader = ({ username, createdAt, avatar }: PropsType) => {
  const owner = true;

  return (
    <div className="w-full flex justify-between">
      <div className="flex items-center gap-[10px]">
        <img src={avatar} className="size-[32px]" />
        <h2 className="text-[#334253] text-[16px]">{username}</h2>
        <span className="text-[#67727E]">{createdAt}</span>
      </div>
      <div className="hidden sm:flex gap-[25px]">
        {owner ? (
          <>
            <ActionButton type="delete" />
            <ActionButton type="edit" />
          </>
        ) : (
          <ActionButton type="reply" />
        )}
      </div>
    </div>
  );
};

export default CommentHeader;
