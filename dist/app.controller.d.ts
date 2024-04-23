import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    aaa(username: string, userInfo: any): any;
    bbb(): string;
}
