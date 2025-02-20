'use server'
export type AuthInputType = {
    username: string;
    email: string;
    password: string
}

export type PrevStateType = {
    error?: string;
    success?: boolean;
    data?: AuthInputType;
    isLogin: boolean
}
export const authAction = async (prevState: PrevStateType, formData: FormData): Promise<PrevStateType> => {

    const username = formData.get("username")
    const password = formData.get("password")
    return prevState;
}