type PropsType = {
  title: string;
  icon: string;
  onClick: () => void;
};

const ReplyComment = ({ title, icon, onClick }: PropsType) => {
  return (
    <button
      onClick={onClick}
      className="text-[#5357B6] flex gap-1 items-center"
    >
      <img src={icon} />
      <span>{title}</span>
    </button>
  );
};

export default ReplyComment;
