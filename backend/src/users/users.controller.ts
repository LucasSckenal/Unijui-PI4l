import { Controller, Post, Body, Put, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() body: any,
  ) {
    console.log('Body:', body); // Exibe nome, email e password
    console.log('Avatar:', avatar); // Exibe detalhes do arquivo
    const { name, email, password } = body;

    return this.usersService.register(name, email, password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user };
  }

  @Put(':id/profile')
  async updateProfile(
    @Param('id') id: number,
    @Body() body: { name: string; avatar?: string },
  ) {
    return this.usersService.updateProfile(id, body.name, body.avatar);
  }
}
