import React from "react";
import ThreadsLogo from "../logo/threads-logo";
import SortFeed from "./sort-feed";

const HomeHeader = () => {
  return (
    <>
      <ThreadsLogo classNames="mx-auto my-[20px]" />
      <SortFeed />
    </>
  );
};

export default HomeHeader;
