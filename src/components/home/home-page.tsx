"use client";
import Post from "@/components/post/post";
import HomeHeader from "@/components/common/header";
import { getThreads } from "@/lib/get-functions/get-threads";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "framer-motion";
import { PostPropType } from "../post/type";
import LoadingSpinner from "../common/loading-spinner";

export default function HomePage({
  onlyFollowing,
  children
}: {
  onlyFollowing?: boolean;
  children:React.ReactNode
}) {
  const [threads, setThreads] = useState<PostPropType[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  //Fetching threads ( use useCallback hook to optimize the function , only triggers when the dep changes )
  const fetchThreads = useCallback(async () => {
    if (isLoading || isFinished) return;
    setIsLoading(true);

    const res = (await getThreads(page, onlyFollowing)) || [];

    if (res.length > 0) {
      setThreads((prev) => {
        const merged = [...prev, ...res];
        const uniqueThreads = Array.from(
          new Map(merged.map((item) => [item.id, item])).values()
        );
        return uniqueThreads;
      });

      setPage((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }

    setIsLoading(false);
  }, [page, onlyFollowing, isLoading, isFinished]);


  useEffect(() => {
    if (!isLoading && !isFinished) {
      fetchThreads();
    }
  }, [isInView]);

  //Render thread conditionally
  const renderThreads = () => {
    if (isFinished && threads?.length == 0) {
      return <p className="py-[15px] text-center">No threads are found!</p>;
    }

    return threads?.map((thread, index) => (
      <Fragment key={thread.id}>
        <Post {...thread} />
        {index === 2 && children}
      </Fragment>
    ));
  };

  return (
    <div className="pb-[60px]">
      <HomeHeader />

      {renderThreads()}

      <div ref={ref}></div>

      {isLoading && (
        <div className="mt-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
