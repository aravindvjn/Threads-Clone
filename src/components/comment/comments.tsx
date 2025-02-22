"use client";
import React, {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Header from "./header";
import SingleComment from "./single-comment";
import CommentInput from "./comment-input";
import CommentFooter from "./comment-footer";
import { getComments } from "@/lib/get-functions/get-comments";
import { CommentsType } from "./type";
import { addComment } from "@/lib/actions/add-comment-action";

type CommentsProps = {
  showComments: string;
  setShowComments: Dispatch<SetStateAction<string>>;
};
const Comments = ({ showComments, setShowComments }: CommentsProps) => {
  const [comments, setComments] = useState<CommentsType[]>([]);
  const [images, setImages] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(
    addComment.bind(null, images),
    {
      error: "",
      success: false,
      data: {
        threadId: showComments,
      },
    }
  );

  const fetchComments = async () => {
    setIsLoading(true);
    const results = (await getComments(showComments, 1)) || [];
    setComments(results as CommentsType[]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, []);

  useEffect(() => {
    if (state.success && state.data?.comment) {
      setComments((prev: CommentsType[]) => [...prev, state.data?.comment!]);
      setImages([]);
      setImageUrls([]);
    }
  }, [state]);

  if (!showComments) return null;

  const renderComments = () => {
    if (!isLoading && comments.length === 0) {
      return (
        <p className="py-[20px] text-center opacity-60">
          No comments are available yet.
        </p>
      );
    }

    if (comments.length > 0) {
      return comments.map((comment) => (
        <SingleComment key={comment.id} {...comment} />
      ));
    }
    return null;
  };

  return createPortal(
    <div className="fixed inset-0 bg-background overflow-y-scroll">
      <Header setShowComments={setShowComments} />
      <div>{renderComments()}</div>

      {isLoading && (
        <div className="h-6 w-6 mx-auto rounded-full border-4 opacity-60 border-t-transparent border-blue-500 animate-spin"></div>
      )}

      <form action={formAction}>
        <CommentInput
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          setImages={setImages}
        />
        {!state.success && state.error && (
          <p className="text-red-500 text-center">{state.error}</p>
        )}
        <CommentFooter isPending={isPending} />
      </form>
    </div>,
    document.body
  );
};

export default Comments;
