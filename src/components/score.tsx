import Plus from "../assets/images/icon-plus.svg";
import Minus from "../assets/images/icon-minus.svg";
import { useState } from "react";

type PropsType = {
  score: number;
};

const Score = ({ score }: PropsType) => {
  const [localScore, setLocalScore] = useState(score);

  return (
    <div className=" w-[100px] sm:w-[40px] h-[40px] sm:h-full bg-[#F5F6FA] rounded-[10px] flex flex-row sm:flex-col justify-center gap-[25px] p-[10px]">
      <button
        onClick={() => setLocalScore((prev) => prev + 1)}
        className="flex justify-center items-center w-full"
      >
        <img src={Plus} />
      </button>
      <div className="text-[#5357B6] text-[16px] w-full text-center h-fit select-none">
        {localScore}
      </div>
      <button
        onClick={() => setLocalScore((prev) => (prev !== 0 ? prev - 1 : prev))}
        className="flex justify-center items-center w-full"
      >
        <img src={Minus} />
      </button>
    </div>
  );
};

export default Score;
