export interface LinkedInJobPostPayload {
  jobPostingOperationType: 'CREATE' | 'UPDATE' | 'CLOSE';
  externalJobPostingId: string;
  companyApplyUrl: string;
  companyJobCode: string;
  companyName: string;
  companyPageUrl: string;
  posterEmail: string;
  availability: string;
  employmentStatus: string;
  experienceLevel: string;
  workplaceTypes: string;
}
