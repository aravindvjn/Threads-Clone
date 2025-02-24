import Link from "next/link";
import React from "react";

const LoggedInProfile = () => {
  return (
    <Link
      href={"/profile/edit"}
      className="p-[8px] border border-bordercolor font-semibold flex justify-center w-full rounded-xl"
    >
      Edit profile
    </Link>
  );
};

export default LoggedInProfile;
