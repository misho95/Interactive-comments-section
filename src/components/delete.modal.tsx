import { createPortal } from "react-dom";

type PropsType = {
  hide: () => void;
  handler: () => void;
};

const DeleteModal = ({ hide, handler }: PropsType) => {
  return createPortal(
    <div className="bg-black/50 fixed top-0 left-0 w-full min-h-screen flex justify-center items-center z-50">
      <div className="bg-white w-11/12 sm:w-[400px] h-fit rounded-[8px] flex flex-col gap-[25px] p-[37px]">
        <h1 className="text-[24px] text-[#334253]">Delete comment</h1>
        <p className="text-[#67727E]">
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="flex justify-between gap-[15px]">
          <button
            onClick={hide}
            className="w-[161px] h-[48px] bg-[#67727E] rounded-[8px] text-[#ffffff]"
          >
            NO, CANCEL
          </button>
          <button
            onClick={handler}
            className="w-[161px] h-[48px] bg-[#ED6368] rounded-[8px] text-[#ffffff]"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteModal;
