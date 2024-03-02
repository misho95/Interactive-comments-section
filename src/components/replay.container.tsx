import Avatar from "../assets/avatar.png";
import ReplayButton from "./replay.button";

type PropsType = {
  title: string;
};

const ReplayContainer = ({ title }: PropsType) => {
  return (
    <div className="w-full bg-white rounded-[8px] py-3 px-5 flex gap-3">
      <img src={Avatar} className="size-10" />
      <textarea className="resize-none w-full border-[1px] border-[#5357B6] rounded-[8px] focus:outline-none p-2" />
      <ReplayButton title={title} />
    </div>
  );
};

export default ReplayContainer;
