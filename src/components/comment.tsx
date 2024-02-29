import Avatar from "../assets/avatar.png";

const Comment = () => {
  return (
    <article className="w-full bg-white rounded-[8px] py-3 px-5 flex gap-3">
      <div className="flex flex-col w-fit bg-[#F5F6FA] rounded-[10px] text-[#C5C6EF] p-2 text-xl">
        <button>+</button>
        <span className="text-[#5357B6] text-lg select-none">12</span>
        <button>-</button>
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <img src={Avatar} />
            <h3 className="text-[#334253]">amyrobson</h3>
            <span className="text-[#67727E]">1 month ago</span>
          </div>
          <button className="text-[#5357B6]">Reply</button>
        </div>
        <p>
          Impressive! Though it seems the drag feature could be improved. But
          overall it looks incredible. You’ve nailed the design and the
          responsiveness at various breakpoints works really well.
        </p>
      </div>
    </article>
  );
};

export default Comment;
