import { JobPostResult } from './commoninterface.dto';
import { TokenResponse } from './commoninterface.dto';

export interface IJobPlatformAdapter {
  getauthurl(): string;
  exchangeCodeForToken(code: string, state: string): Promise<TokenResponse>;
  refreshToken(refreshToken: string): Promise<any>;
  revokeToken(token: string): Promise<any>;

  postJob(job: any): Promise<JobPostResult>;
  updateJob(jobId: string, job: any): Promise<JobPostResult>;
  closeJob(jobId: string): Promise<JobPostResult>;
  deleteJob?(jobId: string): Promise<JobPostResult>;
}
