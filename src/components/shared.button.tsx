import { memo } from "react";

type PropsType = {
  title: string;
  icon: string;
  style?: {};
  onClick: () => void;
};

const SharedButton = memo(({ title, icon, onClick, style }: PropsType) => {
  return (
    <button
      onClick={onClick}
      className="text-[#5357B6] flex gap-1 items-center"
      style={{ ...style }}
    >
      <img src={icon} />
      <span>{title}</span>
    </button>
  );
});

export default SharedButton;
