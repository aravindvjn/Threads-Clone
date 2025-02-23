'use server'
import xss from "xss"
import { getUserId } from "../get-functions/get-user-id"
import { uploadImageToCloudinary } from "../helper/upload-to-cloudinary"
import { prisma } from "../db"
import { CommentsType } from "@/components/comment/type"
import { getUserData } from "../get-functions/get-user-data"

type PrevStateType = {
    data: {
        threadId: string;
        content?: string;
        comment?: CommentsType
    }
    error: string,
    success: boolean
}


export const addComment = async (images: File[] | null, prevState: PrevStateType, formData: FormData) => {
    try {

        //Get current user data
        const user = await getUserData()
        if (!user) {
            return { ...prevState, error: "Please Login." }
        }
        const userId = user.id
        
        //Initialize success as false
        prevState = {
            ...prevState,
            success: false
        }

        //Check threadId is available or not
        if (!prevState.data || !prevState.data?.threadId) {
            return {
                ...prevState,
                error: "Failed to comment."
            }
        }

        //Sanitize inputs
        const content = xss(formData.get("content") as string)
        let image_urls;

        if (!content.trim()) {
            return prevState;
        }

        //Validate and Upload images to the cloudinary and get urls
        if (Array.isArray(images) && images[0]?.size > 0) {

            //Validation
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]

            if (!validImageTypes.includes(images[0].type)) {
                return {
                    ...prevState,
                    error: "Only images (JPEG, PNG, GIF, WEBP) are allowed."
                }

            }

            //Uploading
            image_urls = await uploadImageToCloudinary(images[0])

            if (!image_urls) {
                throw new Error()
            }
        }

        //Save comment to the db
        const comment = await prisma.reply.create({
            data: {
                content,
                image_url: image_urls || '',
                authorId: userId,
                threadId: prevState.data?.threadId
            }
        })

        //Return the comment
        return {
            ...prevState,
            success: true,
            data: {
                ...prevState.data,
                comment: {
                    ...comment,
                    author: user,
                    image_url: comment.image_url || ''
                }
            }
        }
    } catch (error) {
        console.log("Error in posting a comment : ", error)
        return {
            ...prevState,
            error: "Server not responding!"
        }
    }
}