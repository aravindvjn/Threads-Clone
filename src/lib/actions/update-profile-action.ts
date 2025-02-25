'use server'

import xss from "xss";
import { getUserId } from "../get-functions/get-user-id"
import { uploadImageToCloudinary } from "../helper/upload-to-cloudinary";
import { prisma } from "../db";
import { registerAccountValidation } from "../validations/register-validation";
import { redirect } from "next/navigation";

type PrevStateType = {
    success: boolean;
    data?: {
        username: string;
        name: string;
        email: string
    };
    error: string
}

export const updateProfileAction = async (image: File | null, prevState: PrevStateType, formData: FormData) => {

    try {

        //Get user id and validate
        const userId = await getUserId()
        if (!userId) {
            return {
                ...prevState,
                error: "You are not authenticated!"
            }
        }

        //Get form data
        const username = xss(formData.get("username") as string)
        const name = xss(formData.get("name") as string)
        const email = xss(formData.get("email") as string)

        prevState = {
            ...prevState, data: {
                username,
                email,
                name
            },
            success: false
        }

        //Validate inputs 
        const isNotValid = await registerAccountValidation(
            {
                email,
                name,
                password: "thevalidationpasspassword",
                username,
                basicValidation: true
            }
        )

        if (isNotValid) {
            return {
                ...prevState,
                error: isNotValid
            }
        }

        //check that email exists or not
        const isEmailExists = await prisma.user.findUnique({
            where: {
                email,
                NOT: {
                    id: userId
                }
            }
        });

        //check that username already exists or not
        const isUsernameExists = await prisma.user.findUnique({
            where: {
                username,
                NOT: {
                    id: userId
                }
            }
        });

        //if exists, return
        let existsError = '';
        if (isEmailExists && isUsernameExists) {
            existsError = "Email and username already exists"
        } else if (isEmailExists) {
            existsError = "Email already exists"
        } else if (isUsernameExists) {
            existsError = "Username already exists"
        }

        if (existsError) {
            return {
                ...prevState,
                error: existsError
            }
        }

        //upload image, if it's exists
        let image_url;

        if (image && image?.size > 0) {
            image_url = await uploadImageToCloudinary(image)
            if (!image_url) {
                return {
                    ...prevState,
                    error: "Failed to save the Profile Picture"
                }
            }
        }

        //save it to db
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profilePic: image_url,
                username,
                name
            },
        })

    } catch (error) {
        console.log("Error in updating profile : ", error)
        return {
            ...prevState,
            error: "Server not responding!"
        }
    }
    redirect("/profile")
}