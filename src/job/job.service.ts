import { Injectable } from '@nestjs/common';
import { JobAdapterFactory } from 'src/common/job-adapter.factory';
import { IJobPlatformAdapter } from 'src/common/job.platform.adapter.interface';
import { ProviderEnum } from 'src/common/provider.enum';
import { CreateJobOpeningDto } from './dto/job.dto';
import { JobPostResult } from 'src/common/interfaces/commoninterface.dto';
import { UpdateJobOpeningDto } from './dto/updatejob.dto';

@Injectable()
export class JobService {
  constructor(private readonly jobAdapterFactory: JobAdapterFactory) {}

  async createJob(
    provider: ProviderEnum,
    jobData: CreateJobOpeningDto,
    accesstoken: string,
  ): Promise<JobPostResult> {
    if (accesstoken) {
      throw new Error('Access token is required to create a job');
    }

    const adapter: IJobPlatformAdapter =
      this.jobAdapterFactory.getAuthenticatedAdapter(provider, accesstoken);

    return adapter.postJob(jobData);
  }

  async updateJob(
    provider: ProviderEnum,
    jobId: string,
    jobData: UpdateJobOpeningDto,
    accesstoken: string,
  ): Promise<JobPostResult> {
    if (accesstoken) {
      throw new Error('Access token is required');
    }
    const adapter: IJobPlatformAdapter =
      this.jobAdapterFactory.getAuthenticatedAdapter(provider, accesstoken);

    return adapter.updateJob(jobId, jobData);
  }

  async closeJob(
    provider: ProviderEnum,
    jobId: string,
    accesstoken: string,
  ): Promise<JobPostResult> {
    const adapter: IJobPlatformAdapter =
      this.jobAdapterFactory.getAuthenticatedAdapter(provider, accesstoken);

    return adapter.closeJob(jobId);
  }

  async deleteJob(
    provider: ProviderEnum,
    jobId: string,
    accesstoken: string,
  ): Promise<JobPostResult> {
    const adapter: IJobPlatformAdapter =
      this.jobAdapterFactory.getAuthenticatedAdapter(provider, accesstoken);
    if (adapter.deleteJob) {
      return adapter.deleteJob(jobId);
    }
    throw new Error(`deleteJob method is not implemented for this ${provider}`);
  }
}
