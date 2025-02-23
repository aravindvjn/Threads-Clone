'use server';

import { prisma } from "../db";
import { followStatus } from "../helper/follow-status";
import { getUserId } from "./get-user-id";

export const getUserByUsername = async (username: string) => {
    try {

        const userId = await getUserId();
        if (!userId) return null;

        const otherUser = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                name: true,
                profilePic: true,
            }
        });

        if (!otherUser) return null;

        const otherUserId = otherUser.id;

        // Get the followers list in parallel using a transaction
        const [followersCount, isFollowing, isFollower, userFollowers, otherUserFollowers] = await prisma.$transaction([

            // Count followers of the other user
            prisma.follower.count({
                where: { followingId: otherUserId }
            }),

            // Check if current user follows the other user
            prisma.follower.findFirst({
                where: { followerId: userId, followingId: otherUserId }
            }),

            // Check if other user follows the current user
            prisma.follower.findFirst({
                where: { followerId: otherUserId, followingId: userId }
            }),

            prisma.follower.findMany({
                where: { followingId: userId },
                select: { followerId: true }
            }),

            prisma.follower.findMany({
                where: { followingId: otherUserId },
                select: { followerId: true }
            })
        ]);

        //make an array of followers and following ids
        const userFollowerIds = userFollowers.map(f => f.followerId);
        const otherUserFollowerIds = otherUserFollowers.map(f => f.followerId);

        //find mutual ids
        const mutualFollowerIds = userFollowerIds.filter(id => otherUserFollowerIds.includes(id));

        //fetch mutuals
        const mutualFollowers = await prisma.user.findMany({
            where: { id: { in: mutualFollowerIds } },
            select: { name: true, username: true, profilePic: true },
            take: 3
        });

        return {
            username: otherUser.username,
            name: otherUser.name,
            profilePic: otherUser.profilePic,
            followersCount,
            mutualFollowers,
            follow: followStatus(!!isFollowing, !!isFollower),
        };
    } catch (error) {
        console.log("Error in getting user by username:", error);
        return null;
    }
};
