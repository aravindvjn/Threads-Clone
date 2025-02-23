'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { getUserId } from "../get-functions/get-user-id";

export const updateFollowers = async (username: string) => {
    try {
        const userId = await getUserId();

        if (!userId) return null;

        // Get the userId of the other user by username
        const otherUser = await prisma.user.findUnique({
            where: { username },
            select: { id: true }
        });

        if (!otherUser) return null;

        const otherUserId = otherUser.id;

        if (userId === otherUserId) {
            return null;
        }

        // Check if the user is already following the other user
        const existingFollow = await prisma.follower.findUnique({
            where: {
                followerId_followingId: { followerId: userId, followingId: otherUserId }
            }
        });

        if (existingFollow) {
            // Unfollow 
            await prisma.follower.delete({
                where: { id: existingFollow.id }
            });
            return "Follow";
        } else {
            // Follow 
            await prisma.follower.create({
                data: { followerId: userId, followingId: otherUserId }
            });
            return "Following";
        }
    } catch (error) {
        console.log("Error in updating followers:", error);
        return null;
    }
};
