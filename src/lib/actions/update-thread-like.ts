"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { getUserId } from "../get-functions/get-user-id";

export const updateThreadLike = async (threadId: string) => {
    const userId = await getUserId();
    if (!userId || !threadId) {
        throw new Error("Invalid user or thread ID");
    }

    const existingLike = await prisma.like.findFirst({
        where: { userId, threadId },
    });

    if (existingLike) {
        await prisma.like.delete({
            where: { id: existingLike.id }, 
        });
    } else {
        await prisma.like.create({
            data: { userId, threadId },
        });
    }
    const likeCount = await prisma.like.count({
        where: { threadId },
    });

    return likeCount;
};
