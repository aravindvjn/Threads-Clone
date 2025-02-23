import React, { Dispatch, SetStateAction } from "react";

type SearchInputType = {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
};

const SearchInput = ({ search, setSearch }: SearchInputType) => {
  return (
    <div className="px-[15px] pb-[10px]">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        className="w-full p-[10px] px-[15px] rounded-2xl bg-cardcolor outline-none placeholder:opacity-50"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchInput;
