import ActivitySortList from "@/components/activity/activity-sort-list";
import ThreadsLogo from "@/components/logo/threads-logo";
import React from "react";
import Follows from "./follows";
import Replies from "./replies";

const Activity = async ({ slug }: { slug?: string }) => {
  let component;
  switch (slug) {
    case "Follows":
      component = <Follows />;
      break;
    case "Replies":
      component = <Replies />;
      break;

    default:
      component = <p className="pt-[40px] opacity-50 text-center">No Activity yet.</p>;
  }
  return (
    <div>
      <div className="flex flex-col py-[20px] items-center">
        <ThreadsLogo />
      </div>
      <ActivitySortList slug={slug || ""} />
      {component}
    </div>
  );
};

export default Activity;
