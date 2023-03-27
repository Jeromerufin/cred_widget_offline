import { CircularProgressbar } from "../../../common/components/CircularProgressbar";


export const CircularCredScoreProgressBar = ({
  minValue,
  maxValue,
  value,
  animationDuration = 1000,
}) => {
  return (
    <div className="flex items-center justify-center h-full -mt-4 md:-mt-8">
      <CircularProgressbar
        className="w-[100%] md:h-[auto] md:min-h-[auto]"
        duration={animationDuration}
        maxValue={maxValue}
        minValue={minValue}
        value={value}
      >
        {/* bottom middle text */}
        <text
          className="text-[4px] md:text-[2.9px] font-medium tracking-[0.18em]"
          dominantBaseline="middle"
          fill="#5D78FF"
          textAnchor="middle"
          x="50%"
          y="92%"
        >
          Powered by
        </text>
        <text
          className="text-[4px] md:text-[3px] font-extrabold tracking-[0.18em]"
          dominantBaseline="middle"
          fill="#5D78FF"
          textAnchor="middle"
          x="50%"
          y="96%"
        >
          Cred Protocol
        </text>

        {/* min value and max value range */}
        <text
          className="text-[5px] md:text-[3.5px] font-medium tracking-[0.18em]"
          dominantBaseline="middle"
          fill="white"
          opacity="0.5"
          textAnchor="middle"
          x="18%"
          y="96%"
        >
          {minValue}
        </text>
        <text
          className="text-[5px] md:text-[3.5px] font-medium tracking-[0.18em]"
          dominantBaseline="middle"
          fill="white"
          opacity="0.5"
          textAnchor="middle"
          x="82.5%"
          y="95.5%"
        >
          {maxValue}
        </text>
      </CircularProgressbar>
    </div>
  );
};

export default CircularCredScoreProgressBar;
