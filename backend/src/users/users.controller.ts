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
    const { name, email, password} = body;

    return this.usersService.register(name, email, password);
  }

  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    const token = await this.usersService.generateToken(user);
    return { message: 'Login successful', user, authToken: token };
  }

  @Put(':id/profile')
  async updateProfile(
    @Param('id') id: number,
    @Body() body: { name: string; avatar?: string },
  ) {
    return this.usersService.updateProfile(id, body.name, body.avatar);
  }
}
