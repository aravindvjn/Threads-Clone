import { prisma } from "../db";
import { getUserId } from "./get-user-id";

export const getSuggestions = async () => {
  try {

    const userId = await getUserId()

    if(!userId){
        return []
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: { following: true },
    });

    const followingList = profile?.following || [];

    const suggestions = await prisma.user.findMany({

      where: {
        id: { notIn: [...followingList, userId] },
      },

      select: {
        id: true,
        name: true,
        username: true,
        profilePic: true,
      },
    });

    return suggestions;
  } catch (error) {
    return [];
  }
};
