import { useContext } from "react";
import { UserContext } from "../App";
import Button from "./button";

type PropsType = {
  title: string;
  buttonHandler: () => void;
  content: {
    value: string;
    onChange: (arg: string) => void;
  };
};

const ReplyContainer = ({ title, buttonHandler, content }: PropsType) => {
  const user = useContext(UserContext);

  return (
    <div className="bg-[#ffffff] w-full rounded-[8px] p-[34px] flex gap-[16px]">
      <img src={user.image.png} className="size-[40px]" />
      <textarea
        value={content.value}
        onChange={(e) => content.onChange(e.target.value)}
        className="w-full h-[96px] p-[17px] border-[1px] border-[#E9EBF0] rounded-[8px] resize-none focus:outline-none text-[#67727E]"
        placeholder="Add a comment…"
      />
      <Button title={title} handler={buttonHandler} />
    </div>
  );
};

export default ReplyContainer;
