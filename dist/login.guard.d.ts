import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Permission } from './user/entities/permission.entity';
interface JwtUserData {
    userId: number;
    username: string;
    roles: string[];
    permissions: Permission[];
    email: string;
}
declare module 'express' {
    interface Request {
        user: JwtUserData;
    }
}
export declare class LoginGuard implements CanActivate {
    private reflector;
    private jwtService;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export {};
