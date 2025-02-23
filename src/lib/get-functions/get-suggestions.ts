import { prisma } from "../db";
import { getUserId } from "./get-user-id";

export const getSuggestions = async () => {
  try {
    const userId = await getUserId();
    if (!userId) return [];

    const followingList = await prisma.user.findUnique({
      where: { id: userId },
      select: { following: { select: { id: true } } }
    });

    const followingIds = followingList?.following.map(user => user.id) || [];

    const suggestions = await prisma.user.findMany({
      where: {
        id: { notIn: [...followingIds, userId] }
      },
      select: {
        id: true,
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
