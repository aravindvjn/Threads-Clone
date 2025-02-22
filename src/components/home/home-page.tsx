import Post from "@/components/post/post";
import HomeHeader from "@/components/common/header";
import Suggestions from "@/components/suggestions/suggestions";
import { getThreads } from "@/lib/get-functions/get-threads";
import { Fragment, Suspense } from "react";

export default async function HomePage() {
  const threads = (await getThreads(1)) || [];

  const renderThreads = () => {
    if (threads?.length == 0) {
      return <p className="py-[15px] text-center">No threads are found!</p>;
    }

    return threads?.map((thread, index) => (
      <Fragment key={thread.id}>
        <Post {...thread} />
        {index === 2 && (
          <Suspense>
            <Suggestions />
          </Suspense>
        )}
      </Fragment>
    ));
  };
  return (
    <div className="pb-[60px]">
      <HomeHeader />
      {renderThreads()}
    </div>
  );
}
