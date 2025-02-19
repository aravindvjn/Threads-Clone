'use client'
import React, { useRef } from "react";
import PostHead from "../post/post-head";
import AttachMedia from "../common/attach-media";

const NewThreadForm = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto"; 
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  return (
    <form>
      <PostHead contentOpacity={0.5} content="What's New ?" />
      <div className="pl-[57px] py-[10px] pr-[20px]">
        <textarea
          ref={textAreaRef}
          className="bg-cardcolor rounded-lg w-full outline-none p-[10px] resize-none overflow-hidden"
          name="content"
          onInput={handleInput}
          rows={1} 
        />
        <AttachMedia />
      </div>
    </form>
  );
};

export default NewThreadForm;
