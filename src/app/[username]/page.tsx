import ProfileHead from "@/components/profile/profile-head";
import { notFound } from "next/navigation";
import React from "react";

type ParamsType = {
  params: Promise<{
    username: string;
  }>;
};

const page = async ({ params }: ParamsType) => {
  const { username } = await params;
  if(!username){
    notFound()
  }
  return (
    <div>
      <ProfileHead />
    </div>
  );
};

export default page;
