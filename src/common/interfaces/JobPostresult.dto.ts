export interface JobPostResult {
  externalJobId?: string;
  status: 'SUCCESS' | 'FAILED';
  error?: any;
}
