import NewThreadForm from "@/components/forms/new-thread-form";
import React from "react";

const page = () => {
  return (
    <div>
      <p className="p-[10px] text-center font-semibold text-[18px]">
        New thread
      </p>
      <NewThreadForm />
    </div>
  );
};

export default page;
