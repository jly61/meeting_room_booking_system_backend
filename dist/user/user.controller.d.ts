/// <reference types="multer" />
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { RefreshTokenVo } from './vo/refesh-token.vo';
import { UserInfoVo } from './vo/user-info.vo';
export declare class UserController {
    private readonly userService;
    private emailService;
    private redisService;
    private jwtService;
    private configService;
    constructor(userService: UserService);
    register(registerUserDto: RegisterUserDto): Promise<"注册成功" | "注册失败">;
    captcha(address: string): Promise<string>;
    initData(): Promise<string>;
    userLogin(loginUser: LoginUserDto): Promise<LoginUserVo>;
    adminLogin(loginUser: LoginUserDto): Promise<LoginUserVo>;
    refresh(token: string): Promise<RefreshTokenVo>;
    makeToken(user: any, expiresIn: any): string;
    adminRefresh(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    info(userId: number): Promise<UserInfoVo>;
    updatePassword(passwordDto: UpdateUserPasswordDto): Promise<"密码修改成功" | "密码修改失败">;
    updatePasswordCaptcha(address: string): Promise<string>;
    update(userId: number, updateUserDto: UpdateUserDto): Promise<"用户信息修改成功" | "用户信息修改失败">;
    updateCaptcha(address: string): Promise<string>;
    freeze(userId: number): Promise<string>;
    list(username: string, nickName: string, email: string, pageNumber: number, pageSize: number): Promise<import("./vo/user-list.vo").UserListVo>;
    upload(file: Express.Multer.File): Promise<string>;
}
