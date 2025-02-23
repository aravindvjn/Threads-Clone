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
    follow:FollowStatusType;
  };
  

  export type ProfileData = {
    mutualFollowers: UserDataType[];
    followersCount: number;
    follow: FollowStatusType;
    username: string;
  };
  