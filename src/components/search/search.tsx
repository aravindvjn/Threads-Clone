"use client";
import React, { useEffect, useState } from "react";
import ListedSingleProfile from "../common/listed-single-profile";
import SearchInput from "./search-input";
import { getSearchedUser } from "@/lib/get-functions/get-search-user";
import { UserDataType } from "@/lib/get-functions/get-user-data";
import { getSuggestions } from "@/lib/get-functions/get-suggestions";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<UserDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<UserDataType[]>([]);

  const fetchUser = async () => {
    if (!search) return;
    setIsLoading(true);
    const searchResults = await getSearchedUser(search);
    setResults(searchResults);
    setIsLoading(false);
  };

  //Fetch new users when the search state changes
  useEffect(() => {
    fetchUser();
  }, [search]);

  //Get suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      const res = (await getSuggestions()) || [];
      setSuggestions(res);
      console.log(res)
    };

    fetchSuggestions();
  }, []);

  //Conditinally Render the Search results
  const renderResults = () => {
    if (!isLoading && !search && suggestions.length > 0) {
      return (
        <div>
          <p className="text-center opacity-60 py-[20px]">Suggestions</p>
          {suggestions?.map((user) => (
            <ListedSingleProfile key={user?.username} {...user!} />
          ))}
        </div>
      );
    }

    if (!isLoading && search && results.length === 0) {
      return (
        <p className="text-center py-[20px] opacity-60">No results found!</p>
      );
    }

    if (isLoading) {
      return (
        <div className="h-6 mx-auto mt-[15px] w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
      );
    }

    return results.map((user) => (
      <ListedSingleProfile key={user?.username} {...user!} />
    ));
  };

  return (
    <div>
      <SearchInput setSearch={setSearch} search={search} />
      {renderResults()}
    </div>
  );
};

export default Search;
