import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JobAdapterFactory } from 'src/common/job-adapter.factory';
import { LinkedinAdapter } from 'src/platforms/linkedIn/linkedin.adapter';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { IndeedAdapter } from 'src/platforms/indeed/indeed.adapter';

@Module({
  imports: [HttpModule],
  controllers: [JobController],
  providers: [LinkedinAdapter, JobAdapterFactory, JobService, IndeedAdapter],
  exports: [JobAdapterFactory],
})
export class Jobmodule {}
