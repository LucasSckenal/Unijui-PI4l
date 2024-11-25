import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    registerUser(file: Express.Multer.File, body: {
        name: string;
        email: string;
        password: string;
    }): Promise<any>;
}
