'use server'

import xss from "xss"
import { prisma } from "../db"
import { getUserId } from "../get-functions/get-user-id"
import bcrypt from 'bcrypt'

export const changePassword = async (prevState: string, formData: FormData) => {

    try {
        const userId = await getUserId()

        if (!userId) {
            return "You are not authenticated, Please login again."
        }

        const password = xss(formData.get("password") as string)
        const newpassword = xss(formData.get("newpassword") as string)

        if (!password.trim() && !newpassword.trim()) {
            return "Fill the fields."
        }

        const user = (await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                password: true
            }
        }))

        if (!user) {
            return "Something went wrong. Please login and try again!"
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return "Incorrect current password"
        }

        if (newpassword.length < 8) {
            return "New password must contain atleast 8 characters"
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10)

        if (!hashedPassword) {
            throw new Error("Failed to hash the password")
        }

        await prisma.user.update({
            where: {
                id: userId,
                password: user.password
            },
            data: {
                password: hashedPassword
            }
        })

        return "Password changed successfully"

    } catch (error) {
        console.log("Error in changing password : ", error)
        return "Sever not responding!"
    }
}