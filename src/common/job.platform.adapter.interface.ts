import { JobPostResult } from 'src/common/interfaces/JobPostresult.dto';

export interface IJobPlatformAdapter {
  getauthurl(): string;
  exchangeCodeForToken(code: string): Promise<any>;
  exchangeToken?(code: string): Promise<any>;
  refreshToken(refreshToken: string): Promise<any>;
  revokeToken(token: string): Promise<any>;

  postJob(job: any, body: any): Promise<JobPostResult>;
  updateJob(jobId: number, job: any, body: any): Promise<JobPostResult>;
  closeJob(jobId: number, job: any): Promise<JobPostResult>;
}
