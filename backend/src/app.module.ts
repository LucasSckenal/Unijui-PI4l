import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsModule } from './sensors/sensors.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: false,
      logging: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    SensorsModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}