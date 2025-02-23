export interface PostPropType {
    likeCount: number;
    replyCount: number;
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

export type ButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
};


export type MediaProps = {
    image_urls?: string[];
};

export type PostHeadProps = {
    content: string;
    contentOpacity?: number;
    id: string;
    username: string;
    profilePic: string | null;
    createdAt?: Date;
}

export type ProfilePictureProps = {
  profilePic: string;
  size: number;
  username:string
};
