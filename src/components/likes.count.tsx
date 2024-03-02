type PropsType = {
  likes: number;
  onChange: (arg: number) => void;
};

const LikesCount = ({ likes, onChange }: PropsType) => {
  const decreaseHandler = () => {
    if (likes > 0) {
      onChange(likes - 1);
    }
  };

  return (
    <div className="min-w-[37px] flex flex-row gap-3 items-center sm:flex-col w-fit bg-[#F5F6FA] rounded-[10px] text-[#C5C6EF] p-2 text-xl">
      <button onClick={() => onChange(likes + 1)}>+</button>
      <span className="text-[#5357B6] text-lg select-none">{likes}</span>
      <button onClick={decreaseHandler}>-</button>
    </div>
  );
};

export default LikesCount;
