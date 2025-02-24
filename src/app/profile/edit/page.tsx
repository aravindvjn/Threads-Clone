import EditProfile from "@/components/forms/edit-profile";
import { getUserData } from "@/lib/get-functions/get-user-data";
import { notFound } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUserData();

  if (!user) {
    notFound();
  }

  return (
    <div>
      <EditProfile {...user} />
    </div>
  );
};

export default page;
