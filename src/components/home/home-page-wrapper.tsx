import React from "react";
import HomePage from "./home-page";
import Suggestions from "../suggestions/suggestions";

//To make a server component inside client component ( via children )
const HomePageWrapper = ({ onlyFollowing }: { onlyFollowing?: boolean }) => {

  return (
    <>
      <HomePage onlyFollowing={onlyFollowing}>
        <Suggestions />
      </HomePage>
    </>
  );
};

export default HomePageWrapper;
