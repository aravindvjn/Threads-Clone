'use server'
import { prisma } from "../db"

export const getRepliesByUsername = async (username: string) => {
    try {
        const results = await prisma.reply.findMany({
            where: {
                author: {
                    username: username,
                },
            },
            include: {
                thread: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        image_urls: true,
                        likes: true,
                        likesList: {
                            select: {
                                userId: true,
                            },
                        },
                        author: {
                            select: {
                                id: true,
                                username: true,
                                profilePic: true,
                            },
                        },
                        replies: {
                            select: {
                                id: true,
                                content: true,
                                createdAt: true,
                                author: {
                                    select: {
                                        id: true,
                                        username: true,
                                        profilePic: true,
                                    },
                                },
                            },
                        },
                        _count: {
                            select: { replies: true },
                        },
                    },
                },
            },
        });

        return Array.from(
            new Map(results.map(reply => ({
                id: reply.thread.id,
                content: reply.thread.content,
                createdAt: reply.thread.createdAt,
                image_urls: reply.thread.image_urls,
                likes: reply.thread.likes,
                likeCount: reply.thread.likes,
                replyCount: reply.thread._count.replies,
                likesList: reply.thread.likesList,
                author: reply.thread.author,
                authorId: reply.thread.author.id,
                isUserLiked: false,
                replies: reply.thread.replies.map(r => ({
                    id: r.id,
                    content: r.content,
                    createdAt: r.createdAt,
                    author: r.author,
                })),
            })).map((item) => [item.id, item])).values()
        )
    } catch (error) {
        console.log("Error in getting replies by username:", error);
        return [];
    }
};
