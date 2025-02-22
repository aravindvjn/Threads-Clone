'use client';

import React, { useActionState, useRef, useState } from "react";
import PostHead from "../post/post-head";
import AttachMedia from "../common/attach-media";
import ThreadImagePreview from "../common/thread-image-preview";
import { createThread } from "@/lib/actions/create-thread-action";

const NewThreadForm = ({
  user,
}: {
  user: {
    id: string;
    username: string;
    profilePic: string | null;
  };
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [images, setImages] = useState<File[] | null>(null);
  const [state, formAction, isPending] = useActionState(
    createThread.bind(null, images),
    {
      error: "",
    }
  );

  const [imageUrls, setImageUrls] = useState<string[]>([]);

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
          images={images}
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
