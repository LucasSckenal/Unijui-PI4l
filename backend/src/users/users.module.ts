import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './users.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([users]), // Importa os repositórios 
    JwtModule.register({
      secret: '4LsenhaTOP', // Use uma chave secreta segura!
      signOptions: { expiresIn: '24h' }, // Define a duração do token
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

