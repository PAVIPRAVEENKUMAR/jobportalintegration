import { Injectable } from '@nestjs/common';
import { JobAdapterFactory } from 'src/common/job-adapter.factory';
import { IJobPlatformAdapter } from 'src/common/job.platform.adapter.interface';
import { ProviderEnum } from 'src/common/provider.enum';
import { CreateJobOpeningDto } from './dto/job.dto';
import { JobPostResult } from 'src/common/interfaces/JobPostresult.dto';
import { UpdateJobOpeningDto } from './dto/updatejob.dto';

@Injectable()
export class JobService {
  constructor(private readonly jobAdapterFactory: JobAdapterFactory) {}

  async createJob(
    provider: ProviderEnum,
    jobData: CreateJobOpeningDto,
  ): Promise<JobPostResult> {
    if (!jobData.accessToken) {
      throw new Error('Access token is required to create a job');
    }

    const adapter: IJobPlatformAdapter =
      this.jobAdapterFactory.getAuthenticatedAdapter(
        provider,
        jobData.accessToken,
      );

    return adapter.postJob(jobData);
  }

  async updateJob(
    provider: ProviderEnum,
    jobId: string,
    jobData: UpdateJobOpeningDto,
  ): Promise<JobPostResult> {
    if (!jobData.accessToken) {
      throw new Error('Access token is required');
    }
    const adapter: IJobPlatformAdapter =
      this.jobAdapterFactory.getAuthenticatedAdapter(
        provider,
        jobData.accessToken,
      );

    return adapter.updateJob(jobId, jobData);
  }

  async closeJob(
    provider: ProviderEnum,
    jobId: string,
    accessToken: string,
  ): Promise<JobPostResult> {
    const adapter: IJobPlatformAdapter =
      this.jobAdapterFactory.getAuthenticatedAdapter(provider, accessToken);

    return adapter.closeJob(jobId);
  }
}
