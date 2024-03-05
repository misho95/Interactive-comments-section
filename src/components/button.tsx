type PropsType = {
  title: string;
  handler?: () => void;
};

const Button = ({ title, handler }: PropsType) => {
  return (
    <button
      onClick={handler}
      className="w-[104px] h-[48px] bg-[#5357B6] text-[#ffffff] active:bg-[#C5C6EF] uppercase rounded-[8px]"
    >
      {title}
    </button>
  );
};

export default Button;
