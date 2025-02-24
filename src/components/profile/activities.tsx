"use client";
import React, { useState } from "react";
import { HeadingsType } from "./type";
import HomePage from "../home/home-page";
import Replies from "./replies";

const Activities = ({ username }: { username: string }) => {
  const [options, setOptions] = useState<HeadingsType>("Threads");

  const handleHeadings = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOptions(e.currentTarget.textContent as HeadingsType);
  };

  return (
    <div className="mt-4">
      <div className="grid-cols-3 grid">
        {headings?.map((head) => (
          <button
            className={`p-3 font-semibold  ${
              head === options
                ? "border-foreground border-b-2"
                : "border-background border-b-2"
            }`}
            onClick={handleHeadings}
            key={head}
          >
            {head}
          </button>
        ))}
      </div>
      {options === "Replies" && <Replies />}
      {options === "Threads" && <HomePage onlyUser={username} />}
    </div>
  );
};

export default Activities;

const headings = ["Threads", "Replies", "Reposts"];
