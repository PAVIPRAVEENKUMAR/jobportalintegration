import { JobPostResult } from 'src/common/interfaces/JobPostresult.dto';

export interface IJobPlatformAdapter {
  getauthurl(): string;
  exchangeCodeForToken(code: string): Promise<any>;
  exchangeToken?(code: string): Promise<any>;
  refreshToken(refreshToken: string): Promise<any>;
  revokeToken(token: string): Promise<any>;

  postJob(job: any): Promise<JobPostResult>;
  updateJob(jobId: string, job: any): Promise<JobPostResult>;
  closeJob(jobId: string): Promise<JobPostResult>;
}
