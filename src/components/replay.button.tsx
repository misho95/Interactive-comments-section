type PropsType = {
  title: string;
};

const ReplayButton = ({ title }: PropsType) => {
  return (
    <button className="bg-[#5357B6] hover:bg-[#C5C6EF] px-6 py-3 rounded-[8px] uppercase text-white w-fit h-fit">
      {title}
    </button>
  );
};

export default ReplayButton;
