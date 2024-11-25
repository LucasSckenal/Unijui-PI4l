import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    registerUser(data: {
        name: string;
        email: string;
        password: string;
        avatarPath: string | null;
    }): Promise<User>;
}
