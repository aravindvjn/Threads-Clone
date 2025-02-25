'use server'

import { prisma } from "@/lib/db"
import { getUserId } from "../get-user-id"

export const getFollowsActivity = async () => {
    try {
        //get current userid
        const userId = await getUserId()
        if (!userId) {
            return []
        }

        //Fetch the followersId from the follower which have followingId as userId
        const results = await prisma.follower.findMany({
            where: {
                followingId: userId
            },
            select: {
                follower: {
                    select: {
                        profilePic: true,
                        username: true,
                        name: true
                    }
                },
                createdAt: true
            }
        })
        return results || []
    } catch (error) {
        console.log("Error in getting follows activity : ", error)
        return []
    }
}