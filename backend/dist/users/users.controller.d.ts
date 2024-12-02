/// <reference types="multer" />
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(avatar: Express.Multer.File, body: any): Promise<import("./users.entity").users>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: import("./users.entity").users;
    }>;
    updateProfile(id: number, body: {
        name: string;
        avatar?: string;
    }): Promise<import("./users.entity").users>;
}
