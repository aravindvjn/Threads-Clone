'use server'
import { prisma } from "../db";

export const getComments = async (threadId: string, page: number) => {
    try {
        const limit = 10;
        const skip = (page - 1) * limit;

        const comments = await prisma.reply.findMany({
            where: {
                threadId
            },
            skip,
            take: limit,
            include: {
                author: {
                    select: {
                        profilePic: true,
                        username: true,
                        id: true
                    }
                }
            }
        })

        return comments || [];
    } catch (error) {
        console.log("Error in getting comments : ", error)
        return []
    }
}