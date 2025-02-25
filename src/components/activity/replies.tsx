import { getRepliesActivity } from "@/lib/get-functions/activities/get-replies-activity";
import React from "react";

import ProfilePic from "../post/profile-pic";
import Image from "next/image";

const Replies = async () => {
  const replies = await getRepliesActivity();

  if (replies?.length === 0) {
    return <p className="pt-[40px] opacity-50 text-center">No Activity yet.</p>;
  }
  
  return (
    <div>
      {replies.map((reply) =>
        reply.replies.map((r) => (

          <div
            key={r.threadId}
            className="flex gap-[12px] py-[10px] px-[10px] text-[14px]"
          >

            <div className="w-[60px]">
              <ProfilePic
                profilePic={r.author.profilePic || ""}
                size={50}
                username={r.author.username}
              />
            </div>

            <div className="w-full">
              <div className="w-full flex justify-between">

                <div>
                  <p>
                    <strong>{r.author.username}</strong> replied to your thread
                  </p>
                  <p>{r.content}</p>
                  <p className="text-gray-500 text-sm">In: {reply.content}</p>
                </div>

                <div>
                  {reply.image_urls?.length > 0 && (
                    <Image
                      className="flex h-[60px] w-[60px] object-cover rounded"
                      src={reply.image_urls[0]}
                      alt=""
                      height={100}
                      width={100}
                    />
                  )}
                </div>

              </div>
              <hr className="opacity-30 sm:opacity-15 mt-[10px]" />
            </div>
          </div>
        ))
      )}

    </div>
  );
};

export default Replies;
