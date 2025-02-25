'use server'
import { AuthInputType } from "../actions/auth-action";
import { prisma } from "../db";

export const registerAccountValidation = async ({
    username,
    password,
    email,
    name,
    basicValidation
}: AuthInputType & {
    basicValidation?: boolean
}) => {

    if (username.length < 3 || username.length > 15) {
        return "Username must be between 3 to 15 characters long.";
    }

    if (!/^[a-z0-9_]+$/.test(username)) {
        return "Username can only contain lowercase letters, numbers, and underscores.";
    }

    if ((username.match(/[a-z0-9]/g) || []).length < 2) {
        return "Username must contain at least 2 letters or numbers than underscore.";
    }

    if (password.length < 8) {
        return "Password must be atleast 8 characters long."
    }

    if (!email.includes("@")) {
        return "Enter a valid email address"
    }

    if (name.length < 3 || name.length > 20) {
        return "Name must be between 3 to 20 characters long"
    }

    try {
        if (!basicValidation) {
            const emailExists = await prisma.user.findUnique({
                where: {
                    email
                },
            })

            if (emailExists) {
                return "Email ID already exists, Try Login."
            }

            const usernameExists = await prisma.user.findUnique({
                where: {
                    username
                }
            })

            if (usernameExists) {
                return "Username already taken."
            }
        }

        return null
    } catch (error) {
        console.log("Error in Validating user registration : ", error)
        return "Something went wrong!"
    }

}