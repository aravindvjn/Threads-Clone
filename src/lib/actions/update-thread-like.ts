"use server";
import { prisma } from "../db";
import { getUserId } from "../get-functions/get-user-id";

export const updateThreadLike = async (threadId: string) => {

    //Get current user id
    const userId = await getUserId();

    //Validate
    if (!userId || !threadId) {
        throw new Error("Invalid user or thread ID");
    }

    //check that like exists or not.
    const existingLike = await prisma.like.findFirst({
        where: { userId, threadId },
    });

    //if exists, delte the like and if not, insert the like
    if (existingLike) {
        await prisma.like.delete({
            where: { id: existingLike.id }, 
        });
    } else {
        await prisma.like.create({
            data: { userId, threadId },
        });
    }

    //get like count ( to get updated data from the server )
    const likeCount = await prisma.like.count({
        where: { threadId },
    });

    return likeCount;
};
