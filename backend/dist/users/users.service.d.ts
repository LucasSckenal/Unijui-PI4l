import { Repository } from 'typeorm';
import { users } from './users.entity';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<users>, jwtService: JwtService);
    register(name: string, email: string, password: string, avatar?: string): Promise<users>;
    findByEmail(email: string): Promise<users | undefined>;
    updateProfile(id: number, name: string, avatar?: string): Promise<users>;
    validateUser(email: string, password: string): Promise<users | null>;
    generateToken(user: users): Promise<string>;
}
