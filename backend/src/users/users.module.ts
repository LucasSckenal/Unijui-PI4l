import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './users.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([users]), // Importa os repositórios 
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
