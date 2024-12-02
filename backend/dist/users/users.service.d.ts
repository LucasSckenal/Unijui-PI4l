import { Repository } from 'typeorm';
import { users } from './users.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<users>);
    register(name: string, email: string, password: string): Promise<users>;
    findByEmail(email: string): Promise<users | undefined>;
    updateProfile(id: number, name: string, avatar?: string): Promise<users>;
    validateUser(email: string, password: string): Promise<users | null>;
}
