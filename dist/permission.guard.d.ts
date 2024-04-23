import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class PermissionGuard implements CanActivate {
    private jwtService;
    private reflector;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
