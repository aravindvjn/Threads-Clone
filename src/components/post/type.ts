export interface PostPropType {
    likeCount: number;
    replyCount:number;
    isUserLiked: boolean;
    author: {
        id: string;
        username: string;
        profilePic: string | null;
    };
    likesList: {
        userId: string;
    }[];
    id: string;
    content: string;
    authorId: string;
    likes: number;
    image_urls: string[];
    createdAt: Date;
}