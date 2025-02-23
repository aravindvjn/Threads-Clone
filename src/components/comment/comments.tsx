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
import { CommentsProps, CommentsType } from "./type";
import { addComment } from "@/lib/actions/add-comment-action";
import LoadingSpinner from "../common/loading-spinner";


const Comments = ({ showComments, setShowComments }: CommentsProps) => {

  const [comments, setComments] = useState<CommentsType[]>([]);
  const [images, setImages] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //Handle form server action
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

  //Fetch all comments
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

  //use useEffect to monitor the change in state and if its success, reset the inputs.
  useEffect(() => {
    if (state.success && state.data?.comment) {
      setComments((prev: CommentsType[]) => [...prev, state.data?.comment!]);
      setImages([]);
      setImageUrls([]);
    }
  }, [state]);

  //Conditionally rendering the comment section
  if (!showComments) return null;


  //Render comments ( conditionally )
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

      {isLoading && <LoadingSpinner />}

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
