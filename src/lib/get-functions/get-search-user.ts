'use server';

import { prisma } from "../db";
import { getUserId } from "./get-user-id";

export const getSearchedUser = async (searchParams: string) => {
    try {

        //get user id to exclude the current user from the result
        const userId = await getUserId();

        const users = await prisma.user.findMany({
            where: {
                id: { not: userId || '' }, 
                OR: [
                    { username: { contains: searchParams, mode: "insensitive" } },
                    { name: { contains: searchParams, mode: "insensitive" } }
                ]
            },
            select: {
                id: true,
                username: true,
                name: true,
                profilePic: true
            }
        });

        // Fetch followers count for each user in a single query
        const userFollowerCounts = await prisma.follower.groupBy({
            by: ["followingId"],
            where: { followingId: { in: users.map(user => user.id) } },
            _count: { followingId: true }
        });

        const followerCountMap = Object.fromEntries(
            userFollowerCounts.map(({ followingId, _count }) => [followingId, _count.followingId])
        );

        return users.map(user => ({
            ...user,
            followersCount: followerCountMap[user.id] || 0
        }));

    } catch (error) {
        console.log("Error in getting searched users:", error);
        return [];
    }
};
