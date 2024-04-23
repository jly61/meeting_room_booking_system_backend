import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserListVo } from './vo/user-list.vo';
export declare class UserService {
    private logger;
    private userRepository;
    private roleRepository;
    private permissionRepository;
    private redisService;
    register(user: RegisterUserDto): Promise<"注册成功" | "注册失败">;
    initData(): Promise<void>;
    login(loginUser: LoginUserDto, isAdmin: boolean): Promise<LoginUserVo>;
    findUserById(userId: number, isAdmin: boolean): Promise<{
        id: number;
        username: string;
        isAdmin: boolean;
        roles: string[];
        permissions: any[];
        email: string;
    }>;
    findUserDetailById(userId: number): Promise<User>;
    updatePassword(passwordDto: UpdateUserPasswordDto): Promise<"密码修改成功" | "密码修改失败">;
    update(userId: number, updateUserDto: UpdateUserDto): Promise<"用户信息修改成功" | "用户信息修改失败">;
    freezeUserById(userId: number): Promise<void>;
    findUsersByPage(username: string, nickName: string, email: string, pageNumber: number, pageSize: number): Promise<UserListVo>;
}
