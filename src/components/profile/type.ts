import { UserDataType } from "@/lib/get-functions/get-user-data";

export type FollowStatusType = 'Follow' | 'Following'

export type ProfilePropsType = {
  username: string;
  name: string;
  profilePic: string | null;
  followersCount: number;
  mutualFollowers: {
    name: string;
    profilePic: string | null;
    username: string;
  }[];
  follow: FollowStatusType;
};


export type ProfileData = {
  mutualFollowers: UserDataType[];
  followersCount: number;
  follow: FollowStatusType;
  username: string;
};


export type HeadingsType = "Threads" | "Replies" | "Reposts"


export interface ReplyType {
  id: string;
  content: string;
  createdAt: Date;
  author: {
      id: string;
      username: string;
      profilePic: string | null;
  };
}

export interface ThreadWithRepliesType {
  id: string;
  content: string;
  createdAt: Date;
  image_urls: string[];
  likes: number;
  likeCount: number;
  replyCount: number;
  isUserLiked: boolean;
  author: {
      id: string;
      username: string;
      profilePic: string | null;
  };
  likesList: {
      userId: string;
  }[];
  authorId: string;
  replies: ReplyType[];
}

export type GetRepliesByUsernameReturnType = ThreadWithRepliesType[];
