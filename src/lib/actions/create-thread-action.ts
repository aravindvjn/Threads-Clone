"use server"

import xss from "xss"
import { getUserId } from "../get-functions/get-user-id"
import { redirect } from "next/navigation"
import { uploadImageToCloudinary } from "../helper/upload-to-cloudinary"
import { prisma } from "../db"
import { revalidatePath } from "next/cache"

type PrevStateType = {
    error: string;
    data?: {
        content: string;
        images: File[] | null
    }
}


export const createThread = async (images: File[] | null, prevState: PrevStateType, formData: FormData) => {
    try {

        //Get the user id from headers
        const userId = await getUserId()

        if (!userId) {
            return {
                error: "Please login first!"
            }
        }

        //Extract data from the form 
        const content = xss(formData.get("content") as string)

        prevState = {
            ...prevState, data: {
                content,
                images
            }
        }

        let image_urls;

        //If images, validate them and upload to cloudinary
        if (Array.isArray(images) && images[0].size > 0) {

            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]

            for (const file of images) {
                if (!validImageTypes.includes(file.type)) {
                    return {
                        ...prevState, error: "Only images (JPEG, PNG, GIF, WEBP) are allowed."
                    }
                }
            }

            //Upload to cloundinary and get urls
            image_urls = await Promise.all(images.map(imgFile => uploadImageToCloudinary(imgFile)))

            if (!image_urls) {
                throw new Error()
            }
        }

        //Save the thread on db
        const thread = await prisma.thread.create({
            data: {
                content,
                authorId: userId,
                image_urls: image_urls as string[] || []
            }
        })


        if(!thread){
            return {
                ...prevState,
                error:"Failed to create thred, Please try again!"
            }
        }


    } catch (error) {
        console.log("Error in creating a thread", error)
        return {
            ...prevState, error: "Server not responding!"
        }
    }

    revalidatePath('/')
    redirect('/')
}