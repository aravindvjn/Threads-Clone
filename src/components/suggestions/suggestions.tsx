import React from "react";
import SingleSuggestion from "./single-suggestion";
import { getSuggestions } from "@/lib/get-functions/get-suggestions";

const Suggestions = async () => {
  const suggestions = (await getSuggestions()) || [];

  if (suggestions.length == -0) {
    return null;
  }
  return (
    <div>
      <p className="text-[18px] font opacity-60  px-[20px]">
        Suggested for you
      </p>
      <div className="flex pb-[20px]  pt-[10px] px-[20px] gap-[10px] items-center overflow-x-scroll">
        {suggestions.map((user) => (
          <SingleSuggestion key={user?.id} {...user} />
        ))}
      </div>
      <hr className="opacity-30 text-foreground pb-[10px]" />
    </div>
  );
};

export default Suggestions;
