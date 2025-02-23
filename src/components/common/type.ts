import { Dispatch, SetStateAction } from "react";

//attach-media.tsx
export type AttachMediaType = {
    setImages?: Dispatch<SetStateAction<File[] | null>>;
    setImageUrls: Dispatch<SetStateAction<string[]>>;
  };