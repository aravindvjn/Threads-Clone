import { FollowStatusType } from "@/components/profile/type"

export const followStatus = (isFollowing: boolean, isFollower: boolean):FollowStatusType => {

    if (isFollowing) {
        return "Following"
    }
    return "Follow"

}

export const predictFollowState = (followStatus: FollowStatusType) => {
    if (followStatus === 'Following') {
        return "Follow"
    }
    return "Following"
}