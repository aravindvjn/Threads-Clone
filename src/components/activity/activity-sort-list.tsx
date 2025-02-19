'use client'
import React from "react";
import { options } from "./options";
import Link from "next/link";
import { motion } from "framer-motion";

const ActivitySortList = ({ slug }: { slug: string }) => {
  if (!slug) {
    slug = "All";
  }
  return (
    <div className="flex items-center p-[10px] pt-[5px] gap-[10px] overflow-x-scroll ">
      {options.map((option, index) => (
        <motion.div
          whileTap={{
            scale: 1.1,
            opacity:0.7
          }}
          className="flex"
          key={index}
        >
          <Link
            href={`/activity/${option === "All" ? "" : option}`}
            className={`py-[6px] text-center rounded-full px-[10px] min-w-[100px] border border-bordercolor  ${
              slug === option ? "bg-cardcolor border-2 border-white" : ""
            }`}
          >
            {option}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivitySortList;
