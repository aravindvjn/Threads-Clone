"use client";
import { getRepliesByUsername } from "@/lib/get-functions/get-replies-by-username";
import React, { useEffect, useState } from "react";
import { ThreadWithRepliesType } from "./type";
import SingleThreadReplies from "./single-thread-replies";
import LoadingSpinner from "../common/loading-spinner";

const Replies = ({ username }: { username: string }) => {
  const [replies, setReplies] = useState<ThreadWithRepliesType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchReplies = async () => {
    setIsLoading(true);
    const res = await getRepliesByUsername(username);

    if (res.length > 0) {
      setReplies(res);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-4">
        <LoadingSpinner />
      </div>
    );
  }
  const renderReplies = () => {
    return replies?.map((reply) => (
      <SingleThreadReplies key={reply.id} reply={reply} />
    ));
  };

  return <div className="pb-[60px]">{renderReplies()}</div>;
};

export default Replies;
