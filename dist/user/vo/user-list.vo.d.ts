declare class User {
    id: number;
    username: string;
    nickName: string;
    email: string;
    headPic: string;
    phoneNumber: string;
    isFrozen: boolean;
    createTime: Date;
}
export declare class UserListVo {
    users: User[];
    total: number;
}
export {};
