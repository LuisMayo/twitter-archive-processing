export interface FollowerEntity {
    follower: User;
}

export interface User {
    accountId: string;
    userLink:  string;
}

export interface FollowingEntity {
    following: User;
}

