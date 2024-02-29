const Comment = () => {
  return (
    <div className="w-full bg-white rounded-[8px] py-3 px-5">
      <div className="flex flex-col w-fit bg-[#F5F6FA] rounded-[10px] text-[#C5C6EF] p-2 text-xl">
        <button>+</button>
        <span className="text-[#5357B6] text-lg select-none">12</span>
        <button>-</button>
      </div>
    </div>
  );
};

export default Comment;
