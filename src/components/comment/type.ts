import { Dispatch, SetStateAction } from "react";

export type CommentsType = {
    id: string;
    content: string;
    authorId: string;
    createdAt: Date;
    threadId: string;
    image_url: string;
    author: {
        id: string;
        username: string;
        profilePic: string | null;
    };
}

export type CommentInputProps = {
  setImages?: Dispatch<SetStateAction<File[] | null>>;
  setImageUrls: Dispatch<SetStateAction<string[]>>;
  imageUrls:string[]
};


export type CommentsProps = {
    showComments: string;
    setShowComments: Dispatch<SetStateAction<string>>;
  };