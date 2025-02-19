import ActivitySortList from "@/components/activity/activity-sort-list";
import ThreadsLogo from "@/components/logo/threads-logo";
import React from "react";

const Activity = async ({ slug }: { slug?: string }) => {
  return (
    <div>
      <div className="flex flex-col py-[20px] items-center">
        <ThreadsLogo />
      </div>
      <ActivitySortList slug={slug || ''} />
    </div>
  );
};

export default Activity;
