import ProfileHead from "@/components/profile/profile";
import { getUserByUsername } from "@/lib/get-functions/get-user-by-username";
import { getUserData } from "@/lib/get-functions/get-user-data";
import { notFound, redirect } from "next/navigation";
import React from "react";


const page = async () => {

  const username = (await getUserData())?.username

  if(!username){
    redirect('/')
  }
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <ProfileHead isLoggedInUser {...user} />
    </div>
  );
};

export default page;
