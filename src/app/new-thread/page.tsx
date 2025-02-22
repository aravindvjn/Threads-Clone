import NewThreadForm from "@/components/forms/new-thread-form";
import { getUserData } from "@/lib/get-functions/get-user-data";
import { redirect } from "next/navigation";
import React from "react";

const page =  async() => {

  //Get userData
  const user = await getUserData();

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <p className="p-[10px] text-center font-semibold text-[18px]">
        New thread
      </p>
      <NewThreadForm user={user} />
    </div>
  );
};

export default page;
