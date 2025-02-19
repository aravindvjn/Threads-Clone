import React, { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import Header from "./header";
import SingleComment from "./single-comment";
import CommentInput from "./comment-input";
import CommentFooter from "./comment-footer";

type CommentsProps = {
  showComments: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;
};
const Comments = ({ showComments, setShowComments }: CommentsProps) => {
  if (!showComments) return null;

  return createPortal(
    <div className="fixed inset-0 bg-background">
      <Header setShowComments={setShowComments} />
      <div > 
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <SingleComment key={index} />
          ))}
      </div>
      <CommentInput />
      <CommentFooter />
    </div>,
    document.body
  );
};

export default Comments;
