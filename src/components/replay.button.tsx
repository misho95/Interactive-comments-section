type PropsType = {
  title: string;
  handler: () => void;
};

const ReplayButton = ({ title, handler }: PropsType) => {
  return (
    <button
      onClick={handler}
      className="bg-[#5357B6] hover:bg-[#C5C6EF] px-6 py-3 rounded-[8px] uppercase text-white w-fit h-fit"
    >
      {title}
    </button>
  );
};

export default ReplayButton;
