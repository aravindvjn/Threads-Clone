import ProfileHead from "@/components/profile/profile-head";
import { getUserByUsername } from "@/lib/get-functions/get-user-by-username";
import { notFound } from "next/navigation";
import React from "react";

type ParamsType = {
  params: Promise<{
    username: string;
  }>;
};

const page = async ({ params }: ParamsType) => {
  const { username } = await params;
  const extractedUsername = decodeURIComponent(username).split("@")[1];

  if (!extractedUsername) {
    notFound();
  }

  const user = await getUserByUsername(extractedUsername);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <ProfileHead {...user} />
    </div>
  );
};

export default page;
