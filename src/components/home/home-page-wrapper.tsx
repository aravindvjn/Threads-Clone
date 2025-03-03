
import React from "react";
import HomePage from "./home-page";
import Suggestions from "../suggestions/suggestions";

//To make a server component inside client component ( via children )
const HomePageWrapper = ({ onlyFollowing,onlyUser }: { onlyFollowing?: boolean,onlyUser?:string }) => {

  return (
    <>
      <HomePage onlyFollowing={onlyFollowing} onlyUser={onlyUser}>
        <Suggestions />
      </HomePage>
    </>
  );
};

export default HomePageWrapper;
