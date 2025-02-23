import { FollowStatusType } from "@/components/profile/type";

export const timeAgo = (timestamp: Date | undefined) => {
    if (!timestamp) return null
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((Number(now) - Number(past)) / 1000);

    const intervals = [
        { label: "y", seconds: 31536000 },
        { label: "mo", seconds: 2592000 },
        { label: "w", seconds: 604800 },
        { label: "d", seconds: 86400 },
        { label: "h", seconds: 3600 },
        { label: "m", seconds: 60 },
    ];

    for (let { label, seconds } of intervals) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) return `${interval}${label}`;
    }

    return "Just now";
};


export const predictFollowState = (followStatus: FollowStatusType) => {
    if (followStatus === 'Following') {
        return "Follow"
    }
    return "Following"
}