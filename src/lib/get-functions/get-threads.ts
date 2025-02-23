'use server'
import { getUserId } from "./get-user-id";
import { prisma } from "../db";

export const getThreads = async (page: number, onlyFollowing?: boolean) => {

    //set limit and skip for pagination feature
    const limit = 10;
    const skip = (page - 1) * limit;
    const userId = await getUserId();


    //Fetch threads by constraints
    let threads = []

    let followings: string[] = [];

    if (onlyFollowing) {

        if (!userId) return [];

        const followingUsers = await prisma.follower.findMany({
            where: { followerId: userId },
            select: { followingId: true }
        });

        followings = followingUsers.map(f => f.followingId);

    }

    const whereCondition = {
        ...(onlyFollowing ? {
            authorId: {
                in: [...followings, userId ?? '']
            }
        } : {
            likesList: {
                none: { userId: userId || '' }
            }
        })
    }


    const includeQueries = {
        author: {
            select: {
                id: true,
                username: true,
                profilePic: true
            }
        },
        likesList: {
            select: {
                userId: true
            }
        },
        replies: {
            select: {
                id: true
            }
        }
    }

    threads = await prisma.thread.findMany({
        where: whereCondition,
        orderBy: {
            createdAt: 'desc',
        },
        skip,
        take: limit,
        include: includeQueries
    });

    if (threads.length < 10 && !onlyFollowing) {
        threads = await prisma.thread.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            skip,
            take: limit,
            include: includeQueries
        });

    }

    //suffle the fetched threads randomly
    const shuffledThreads = threads.sort(() => Math.random() - 0.5);

    const formattedThreads = shuffledThreads.map(thread => ({
        ...thread,
        likeCount: thread.likesList.length,
        isUserLiked: thread.likesList.some(like => like.userId === userId),
        replyCount: thread.replies.length
    }));

    return formattedThreads || [];
};
