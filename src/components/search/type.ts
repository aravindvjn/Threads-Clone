import { Dispatch, SetStateAction } from "react";

export type SearchInputType = {
    setSearch: Dispatch<SetStateAction<string>>;
    search: string;
  };
  