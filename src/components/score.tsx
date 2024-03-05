import Plus from "../assets/images/icon-plus.svg";
import Minus from "../assets/images/icon-minus.svg";

type PropsType = {
  score: {
    localScore: number;
    setLocalScore: (arg: number) => void;
  };
};

const Score = ({ score }: PropsType) => {
  return (
    <div className=" w-[100px] sm:w-[40px] h-[40px] sm:h-full bg-[#F5F6FA] rounded-[10px] flex flex-row sm:flex-col justify-center gap-[25px] p-[10px]">
      <button
        onClick={() => score.setLocalScore(score.localScore + 1)}
        className="flex justify-center items-center w-full"
      >
        <img src={Plus} />
      </button>
      <div className="text-[#5357B6] text-[16px] w-full text-center h-fit select-none">
        {score.localScore}
      </div>
      <button
        onClick={() =>
          score.setLocalScore(
            score.localScore !== 0 ? score.localScore - 1 : score.localScore
          )
        }
        className="flex justify-center items-center w-full"
      >
        <img src={Minus} />
      </button>
    </div>
  );
};

export default Score;
