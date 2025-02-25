import ChangePassword from "@/components/forms/change-password";
import EditProfile from "@/components/forms/edit-profile";
import { getUserData } from "@/lib/get-functions/get-user-data";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUserData();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div>
      <EditProfile {...user} />
      <ChangePassword />
    </div>
  );
};

export default page;
