"use client";
import { getRepliesByUsername } from "@/lib/get-functions/get-replies-by-username";
import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { ThreadWithRepliesType } from "./type";
import Post from "../post/post";
import SingleComment from "../comment/single-comment";
import SingleThreadReplies from "./single-thread-replies";

const Replies = () => {
  const [replies, setReplies] = useState<ThreadWithRepliesType[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const fetchReplies = async () => {
    setIsLoading(true);

    const res = await getRepliesByUsername("6windh");

    if (res.length > 0) {
      setReplies(res);
    } else {
      setIsFinished(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  const renderReplies = () => {
    return replies?.map((reply) => (
      <SingleThreadReplies key={reply.id} reply={reply} />
    ));
  };

  return <div className="pb-[60px]">{renderReplies()}</div>;
};

export default Replies;
