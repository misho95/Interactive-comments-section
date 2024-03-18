import { useContext } from "react";
import { UserContext } from "../App";
import Button from "./button";
import { animated, useTransition } from "@react-spring/web";

type PropsType = {
  title: string;
  buttonHandler: () => void;
  content: {
    value: string;
    onChange: (arg: string) => void;
  };
  open?: boolean;
  reply?: boolean;
};

const ReplyContainer = ({
  title,
  buttonHandler,
  content,
  open = true,
  reply = true,
}: PropsType) => {
  const user = useContext(UserContext);

  const transiton = useTransition(open ? [1] : [], {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
    config: {
      duration: 300,
    },
  });

  return transiton((style, item) => (
    <animated.div
      style={reply ? style : {}}
      className="bg-[#ffffff] w-full rounded-[8px] p-[34px] "
    >
      {item && (
        <>
          <div className="hidden sm:flex gap-[16px]">
            <img src={user.image.png} className="size-[40px]" />
            <textarea
              value={content.value}
              onChange={(e) => content.onChange(e.target.value)}
              className="w-full h-[96px] p-[17px] border-[1px] border-[#E9EBF0] rounded-[8px] resize-none focus:outline-[#5357B6] text-[#67727E]"
              placeholder="Add a comment…"
            />
            <Button title={title} handler={buttonHandler} />
          </div>
          <div className="flex flex-col gap-[20px] sm:hidden">
            <textarea
              value={content.value}
              onChange={(e) => content.onChange(e.target.value)}
              className="w-full h-[96px] p-[17px] border-[1px] border-[#E9EBF0] rounded-[8px] resize-none focus:outline-[#5357B6] text-[#67727E]"
              placeholder="Add a comment…"
            />
            <div className="flex justify-between items-center">
              <img src={user.image.png} className="size-[40px]" />
              <Button title={title} handler={buttonHandler} />
            </div>
          </div>
        </>
      )}
    </animated.div>
  ));
};

export default ReplyContainer;
