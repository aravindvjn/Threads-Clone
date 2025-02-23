'use server'
import xss from "xss";
import { prisma } from "../db";
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";
import { registerAccountValidation } from "../validations/register-validation";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

export type AuthInputType = {
    username: string;
    email: string;
    password: string,
    name: string
}

export type PrevStateType = {
    error?: string;
    data?: AuthInputType;
    isLogin: boolean
}


export const authAction = async (prevState: PrevStateType, formData: FormData): Promise<PrevStateType> => {

    //Sanitize user inputs
    const username = xss(formData.get("username") as string)
    const password = xss(formData.get("password") as string)
    const email = xss(formData.get("email") as string
    )
    const name = xss(formData.get("name") as string)

    //set the data to the prevState.
    prevState = {
        ...prevState, data: {
            email, password, username, name
        },
        error: ""
    }

    //Validate user inputs ( For login and registration )
    if (!username) {
        prevState.error = "Please fill the username";
        return prevState;
    }

    if (!password) {
        prevState.error = "Please fill the password"
        return prevState;
    }

    //If its login, handle login actions
    if (prevState.isLogin) {
        try {

            //Find user from the db
            const user = await prisma.user.findUnique({
                where: {
                    username,
                }
            })

            if (!user) {
                prevState.error = "Invalid Credentials"
                return prevState
            }

            //Check that passwords matches
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                prevState.error = "Invalid Credentials";
                return prevState;
            }

            //Sign JWT token
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.SECRET_KEY!,
                { expiresIn: "10h" }
            );

            //Store the token in the cookies
            const cookieStore = await cookies();

            cookieStore.set("session_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 36000, //( 10 hours )
            });

        } catch (error) {
            console.log("Error in Login :", error)
            prevState.error = "Something went wrong";
            return prevState;

        }
        redirect("/")
    }

    //Registration actions

    //Validate User inputs
    const isError = await registerAccountValidation({
        email, password, username, name
    })

    if (isError) {
        prevState.error = isError;
        return prevState
    }

    try {

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        if (!hashedPassword) {
            throw new Error()
        }

        //create new user in db
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                name
            }
        })

        if (!user) {
            throw new Error()
        }

        //sign new JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.SECRET_KEY!,
            { expiresIn: "10h" }
        );

        //store token as cookie
        const cookieStore = await cookies();

        cookieStore.set("session_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 36000,
        });

    } catch (error) {
        console.log("Error in Registering user :", error)
        prevState.error = "Something went wrong";
        return prevState;

    }
    redirect('/')
}