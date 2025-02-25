type FollowActivityType = {
    createdAt: Date;
    follower: {
        name: string;
        username: string;
        profilePic: string | null;
    }
}