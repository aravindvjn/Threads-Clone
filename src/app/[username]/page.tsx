import ProfileHead from "@/components/profile/profile";
import { getUserByUsername } from "@/lib/get-functions/get-user-by-username";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { ParamsType } from "./type";
import { getUserData } from "@/lib/get-functions/get-user-data";


const page = async ({ params }: ParamsType) => {

  // Get username from the params
  const { username } = await params;

  const extractedUsername = decodeURIComponent(username).split("@")[1];

  if (!extractedUsername) {
    notFound();
  }

  const currentUser = await getUserData()

  if(currentUser?.username === extractedUsername){
    redirect('/profile')
  }
  //Get user data from the username
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
