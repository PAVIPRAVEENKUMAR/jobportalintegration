import { Module } from '@nestjs/common';
import { Authmodule } from './Auth/auth.module';
import { Jobmodule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    Authmodule,
    Jobmodule,
  ],
})
export class AppModule {}
