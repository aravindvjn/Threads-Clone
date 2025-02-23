"use client";
import React, { useEffect, useState } from "react";
import ListedSingleProfile from "../common/listed-single-profile";
import SearchInput from "./search-input";
import { getSearchedUser } from "@/lib/get-functions/get-search-user";
import { UserDataType } from "@/lib/get-functions/get-user-data";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<UserDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUser = async ()=>{
    if(!search) return;
    setIsLoading(true)
    const searchResults = await getSearchedUser(search)
    setResults(searchResults)
    setIsLoading(false)
  }

  useEffect(() => {

    fetchUser()

  }, [search]);


  const renderResults = ()=>{

    if(!isLoading && !search ){
      return <p className="text-center opacity-60 py-[20px]">Suggestions</p>
    }

    if(!isLoading && search && results.length === 0){
      return <p className="text-center py-[20px] opacity-60">No results found!</p>
    }

    if(isLoading){
      return <div className="h-6 mx-auto mt-[15px] w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
    }

    return results.map((user)=><ListedSingleProfile key={user?.username} {...user!} />)
  }
  return (
    <div>
      <SearchInput setSearch={setSearch} search={search} />
      {renderResults()}
    </div>
  );
};

export default Search;
