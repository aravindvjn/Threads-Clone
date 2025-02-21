'use server'

import xss from "xss"
import { getUserId } from "./get-user-id"
import { redirect } from "next/navigation"

export const createThread = async (prevState: string, formData: FormData) => {
    try {

        //Get the user id from headers
        const userId = await getUserId()

        if (!userId) {
            return prevState = "Please login first."
        }

        //Extract data from the form 
        const content = xss(formData.get("content") as string)
        const images = formData.getAll("images") as File[]

        console.log(images)
        // Validate that all files are images
        const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
        for (const file of images) {
            if (!validImageTypes.includes(file.type)) {
                return "Only images (JPEG, PNG, GIF, WEBP) are allowed."
            }
        }

        console.log("Thread content:", content)
        console.log("Valid images uploaded:", images)
        
        return "success"


    } catch (error) {
        console.log("Error in creating a thread", error)
        return prevState = "Server not responding!"
    }
    redirect('/')
}