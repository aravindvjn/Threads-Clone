'use server'
import { getUserId } from "./get-user-id";
import { prisma } from "../db";

export const getThreads = async (page: number) => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const userId = await getUserId();

    const threads = await prisma.thread.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        skip,
        take: limit,
        include: {
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
    });

    const shuffledThreads = threads.sort(() => Math.random() - 0.5);

    const formattedThreads = shuffledThreads.map(thread => ({
        ...thread,
        likeCount: thread.likesList.length,
        isUserLiked: thread.likesList.some(like => like.userId === userId),
        replyCount: thread.replies.length
    }));

    return formattedThreads || [];
};
