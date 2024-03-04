import Reply from "../assets/images/icon-reply.svg";
import Delete from "../assets/images/icon-delete.svg";
import Edit from "../assets/images/icon-edit.svg";

type PropsType = {
  type: "reply" | "delete" | "edit";
  handler?: () => void;
};

const ActionButton = ({ type, handler }: PropsType) => {
  return (
    <button onClick={handler} className="flex gap-[9px] items-center h-fit">
      <img src={type === "reply" ? Reply : type === "delete" ? Delete : Edit} />
      <span
        className={`uppercase text-[16px] ${
          type === "delete" ? "text-[#ED6368]" : "text-[#5357B6]"
        }`}
      >
        {type === "reply" ? "reply" : type === "delete" ? "delete" : "edit"}
      </span>
    </button>
  );
};

export default ActionButton;
