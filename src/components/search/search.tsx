import React from "react";
import ListedSingleProfile from "../common/listed-single-profile";
import SearchInput from "./search-input";

const Search = () => {
  return (
    <div>
      <SearchInput />
      <ListedSingleProfile />
      <ListedSingleProfile />
      <ListedSingleProfile />
    </div>
  );
};

export default Search;
