import Avatar from "../assets/images/avatars/image-amyrobson.png";
import ActionButton from "./action.button";

const Comment = () => {
  return (
    <article className="flex gap-[25px] w-[730px] h-[167px] bg-[#FFFFFF] p-[24px] rounded-[8px]">
      <div>+/12/-</div>
      <div className="flex flex-col gap-[20px]">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-[10px]">
            <img src={Avatar} className="size-[32px]" />
            <h2 className="text-[#334253] text-[16px]">ambrosyn</h2>
            <span>1 month ago</span>
          </div>
          <ActionButton type="reply" />
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
