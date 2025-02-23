'use server'
import { prisma } from "../db";
import { getUserId } from "./get-user-id";

export const getSuggestions = async () => {
  try {

    //Get user id to fetch users that are not in the current users following list.
    const userId = await getUserId();
    if (!userId) return [];

    const followingList = await prisma.user.findUnique({
      where: { id: userId },
      select: { following: { select: { id: true } } }
    });

    //map the ids
    const followingIds = followingList?.following.map(user => user.id) || [];

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
