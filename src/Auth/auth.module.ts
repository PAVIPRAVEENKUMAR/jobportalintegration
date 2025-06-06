import { Module } from '@nestjs/common';
import { JobAdapterFactory } from 'src/common/job-adapter.factory';
import { LinkedinAdapter } from 'src/platforms/linkedIn/linkedin.adapter';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { IndeedAdapter } from 'src/platforms/indeed/indeed.adapter';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [AuthController],
  providers: [LinkedinAdapter, JobAdapterFactory, AuthService, IndeedAdapter],
  exports: [JobAdapterFactory],
})
export class Authmodule {}
