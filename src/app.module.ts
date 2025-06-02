import { Module } from '@nestjs/common';
import { Authmodule } from './Auth/auth.module';
import { Jobmodule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Authmodule,
    Jobmodule,
  ],
})
export class AppModule {}
