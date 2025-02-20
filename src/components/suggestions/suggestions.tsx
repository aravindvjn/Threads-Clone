import React from "react";
import SingleSuggestion from "./single-suggestion";

const Suggestions = () => {
  return (
    <div>
      <p className="text-[18px] font opacity-60  px-[20px]">
        Suggested for you
      </p>
      <div className="flex pb-[20px]  pt-[10px] px-[20px] gap-[10px] items-center overflow-x-scroll">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <SingleSuggestion key={index} />
          ))}
      </div>
      <hr className="opacity-30 text-foreground pb-[10px]" />
    </div>
  );
};

export default Suggestions;
