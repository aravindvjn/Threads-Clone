'use client';
import React, { useActionState, useRef, useState } from "react";
import PostHead from "../post/post-head";
import AttachMedia from "../common/attach-media";
import ThreadImagePreview from "../common/thread-image-preview";
import { createThread } from "@/lib/actions/create-thread-action";
import type { NewThreadFormType } from "./type";

const NewThreadForm = ({
  user,
}: NewThreadFormType) => {

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [images, setImages] = useState<File[] | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //Handle Server action to create a new thread
  const [state, formAction, isPending] = useActionState(
    createThread.bind(null, images),
    {
      error: "",
    }
  );


  //Handle Textarea height ( for making it responsible )
  const handleInput = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  return (
    <form action={formAction}>

      <PostHead {...user} contentOpacity={0.5} content="What's New ?" />

      <div className="pl-[57px] py-[10px] pr-[20px]">
        <textarea
          defaultValue={state.data?.content}
          ref={textAreaRef}
          placeholder="Express your thoughts"
          className="bg-cardcolor rounded-lg w-full outline-none p-[10px] resize-none overflow-hidden"
          name="content"
          onInput={handleInput}
          rows={1}
        />
        <AttachMedia
          setImages={setImages}
          setImageUrls={setImageUrls}
        />
      </div>

      <ThreadImagePreview imageUrls={imageUrls} />

      <div className="flex p-[20px] flex-col">
        {state.error && <p className="text-red-500">{state.error}</p>}

        <button
          disabled={isPending}
          className="p-[12px] rounded-lg bg-foreground font-semibold text-background w-full"
        >
          {isPending ? "Posting..." : "Post"}
        </button>
      </div>

    </form>
  );
};

export default NewThreadForm;
