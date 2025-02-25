"use server";
import { prisma } from "@/lib/db";
import { getUserId } from "../get-user-id";

export const getRepliesActivity = async () => {
    try {
        const userId = await getUserId();

        if (!userId) {
            return [];
        }

        // Fetch replies to the user's threads
        const replies = await prisma.thread.findMany({
            where: {
                authorId: userId,
                replies: {
                    some: {
                        authorId: {
                            not: userId
                        }
                    }
                }
            },
            select: {
                id: true,
                content: true,
                image_urls: true,
                replies: {
                    select: {
                        threadId: true,
                        content: true,
                        createdAt: true,
                        author: {
                            select: {
                                username: true,
                                profilePic: true
                            }
                        }
                    },
                    where: {
                        authorId: {
                            not: userId
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });

        return replies || [];
    } catch (error) {
        console.error("Error in getting Replies activities:", error);
        return [];
    }
};
