import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from './users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(users)
    private readonly userRepository: Repository<users>,
    private readonly jwtService: JwtService,
  ) {}


  // Registrar um novo usuário
  async register(name: string, email: string, password: string, avatar?: string): Promise<users> {
    const newUser = this.userRepository.create({ name, email, password, avatar });
    return this.userRepository.save(newUser);
  }

  // Encontrar usuário por e-mail
  async findByEmail(email: string): Promise<users | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Atualizar perfil do usuário
  async updateProfile(id: number, name: string, avatar?: string): Promise<users> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    user.name = name;
    if (avatar) user.avatar = avatar;
    return this.userRepository.save(user);
  }

  // Validar usuário com e-mail e senha
  async validateUser(email: string, password: string): Promise<users | null> {
    const user = await this.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async generateToken(user: users): Promise<string> {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
