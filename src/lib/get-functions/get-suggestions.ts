'use server'
import { prisma } from "../db";
import { getUserId } from "./get-user-id";

export const getSuggestions = async () => {
  try {

    //Get user id to fetch users that are not in the current users following list.
    const userId = await getUserId();
    if (!userId) return [];

    const followingList = await prisma.follower.findMany({
      where: {
        followerId: userId
      },
      select: {
        followingId: true
      }

    });


    //map the ids
    const followingIds = followingList?.map(user => user.followingId) || [];

    //fetch the user data which are not in the following list
    const suggestions = await prisma.user.findMany({
      where: {
        id: { notIn: [...followingIds, userId] }
      },
      select: {
        name: true,
        username: true,
        profilePic: true
      }
    });

    return suggestions;
  } catch (error) {
    console.error("Error fetching user suggestions:", error);
    return [];
  }
};
