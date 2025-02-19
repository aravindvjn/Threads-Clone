import React from "react";
import SingleSuggestion from "./single-suggestion";

const Suggestions = () => {
  return (
    <div>
      <p className="text-[18px] font opacity-60  px-[20px]">
        Suggested for you
      </p>
      <div className="flex pt-[10px] px-[20px] gap-[10px] items-center overflow-x-scroll">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <SingleSuggestion key={index} />
          ))}
      </div>
    </div>
  );
};

export default Suggestions;
