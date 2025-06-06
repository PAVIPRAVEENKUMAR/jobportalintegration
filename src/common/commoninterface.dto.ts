export interface JobPostResult {
  externalJobId?: string;
  status: 'SUCCESS' | 'FAILED';
  error?: any;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  userId: string;
  refreshTokenExpiresAt: Date | null;
}
