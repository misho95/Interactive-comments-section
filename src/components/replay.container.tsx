import { memo } from "react";
import Avatar from "../assets/avatar.png";
import ReplayButton from "./replay.button";

type PropsType = {
  title: string;
  value: string;
  set: (arg: string) => void;
  handler: () => void;
};

const ReplayContainer = memo(({ title, value, set, handler }: PropsType) => {
  return (
    <div className="w-full bg-white rounded-[8px] py-3 px-5 flex gap-3">
      <img src={Avatar} className="size-10" />
      <textarea
        value={value}
        onChange={(e) => set(e.target.value)}
        className="resize-none w-full border-[1px] border-[#5357B6] rounded-[8px] focus:outline-none p-2"
      />
      <ReplayButton handler={handler} title={title} />
    </div>
  );
});

export default ReplayContainer;
