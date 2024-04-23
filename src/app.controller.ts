import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SetMetadata } from '@nestjs/common';
import { RequireLogin, RequirePermission, UserInfo } from './custom.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @RequireLogin()
  @RequirePermission('ddd')
  aaa(@UserInfo('username') username: string, @UserInfo() userInfo): any {
    return {
      path: 'aaa',
      username,
      userInfo,
    };
  }

  @Get('bbb')
  bbb(): string {
    return 'bbb';
  }
}
