export type CommentsType = {
    id: string;
    content: string;
    authorId: string;
    createdAt: Date;
    threadId: string;
    image_url: string;
    author: {
        id: string;
        username: string;
        profilePic: string | null;
    };
}

