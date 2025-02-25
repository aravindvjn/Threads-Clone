'use server'
import { prisma } from "../db"
import { getUserId } from "./get-user-id"

export type UserDataType = {
    name: string;
    username: string;
    profilePic: string | null;
    followersCount?:number;
    email?:string
} | null

export const getUserData = async () => {
    
    try {
        const userId = await getUserId()

        if (!userId) {
            return null
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true,
                name: true,
                profilePic: true,
                email:true
            }
        })

        return user
    } catch (error) {
        console.log("Error in getting user Data", error)
        return null
    }
}