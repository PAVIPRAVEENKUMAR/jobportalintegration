import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { IJobPlatformAdapter } from 'src/common/job.platform.adapter.interface';
import { IndeedMapper } from './mapper/indeed.mapper';
import { JobPostResult, TokenResponse } from 'src/common/commoninterface.dto';

@Injectable()
export class IndeedAdapter implements IJobPlatformAdapter {
  constructor(private readonly httpService: HttpService) {}

  private accesstoken: string;

  setAccessToken(token: string) {
    this.accesstoken = token;
    return this;
  }

  private API_BASE = 'https://apis.indeed.com/oauth/v2/tokens';
  private JOB_BASE = 'https://apis.indeed.com/employers/v1';

  getauthurl() {
    const baseUrl = 'https://secure.indeed.com/oauth/v2/authorize';
    const clientId = process.env.INDEED_CLIENT_ID;
    const redirectUri = process.env.INDEED_REDIRECT_URI;
    const scope = process.env.INDEED_SCOPE;
    const state = process.env.INDEED_STATE;

    const url = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}&scope=${scope}&prompt=select_employer`;
    return url;
  }

  async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const clientId = process.env.INDEED_CLIENT_ID;
    const clientSecret = process.env.INDEED_CLIENT_SECRET;
    const redirectUri = process.env.INDEED_REDIRECT_URI;
    const params = new URLSearchParams();

    params.append('grant_type', 'authorization code');
    params.append('code', code);
    params.append('client_id', clientId!);
    params.append('client_secret', clientSecret!);
    params.append('redirect_uri', redirectUri!);

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    try {
      const response = await lastValueFrom(
        this.httpService.post(this.API_BASE, params, { headers }),
      );

      const { access_token, refresh_token, expires_in } = response.data;

      const employerId = await this.getEmployerId(access_token);

      return {
        access_token,
        refresh_token,
        expires_in,
        userId: employerId,
        refreshTokenExpiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      };
    } catch (error) {
      console.error(
        'Error exchanging token with Indeed:',
        error.response?.data || error.message,
      );
      throw new Error('Token exchange with Indeed failed');
    }
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const clientId = process.env.INDEED_CLIENT_ID;
    const clientSecret = process.env.INDEED_CLIENT_SECRET;
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', clientId!);
    params.append('client_secret', clientSecret!);

    try {
      const response = await lastValueFrom(
        this.httpService.post(this.API_BASE, params, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );

      const { access_token, expires_in, refresh_token } = response.data;

      return {
        accessToken: access_token,
        expiresIn: expires_in,
        refresh_token,
      };
    } catch (error) {
      console.error(
        'Error refreshing Indeed token:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to refresh Indeed token');
    }
  }

  async revokeToken(token: string): Promise<any> {
    const clientId = process.env.INDEED_CLIENT_ID;
    const clientSecret = process.env.INDEED_CLIENT_SECRET;
    const revokeurl = 'https://apis.indeed.com/oauth/v2/revoke';

    const params = new URLSearchParams();
    params.append('token', token);
    params.append('client_id', clientId!);
    params.append('client_secret', clientSecret!);

    try {
      await lastValueFrom(
        this.httpService.post(revokeurl, params, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );

      return { message: 'Token revoked successfully from Indeed' };
    } catch (error) {
      console.error(
        'Error revoking Indeed token:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to revoke Indeed token');
    }
  }

  private async getEmployerId(accessToken: string): Promise<string> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await lastValueFrom(
        this.httpService.get('https://apis.indeed.com/employer/accounts/v2', {
          headers,
        }),
      );

      return response.data?.accounts?.[0]?.id;
    } catch (error) {
      console.error(
        'Error fetching employer ID:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch employer ID from Indeed');
    }
  }

  async postJob(job: any): Promise<JobPostResult> {
    const apiUrl = `${this.JOB_BASE}/jobs`;

    const payload = IndeedMapper.toPayload(job);

    try {
      const response = await lastValueFrom(
        this.httpService.post(apiUrl, payload, {
          headers: {
            Authoraization: `Bearer ${this.accesstoken}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      return {
        status: 'SUCCESS',
        externalJobId: response.data.job_id,
      };
    } catch (error) {
      return {
        status: 'FAILED',
        error: error.response?.data || 'Unknown error',
      };
    }
  }

  async updateJob(jobId: string, job: any): Promise<JobPostResult> {
    const apiUrl = `${this.JOB_BASE}/jobs/${jobId}`;

    const payload = IndeedMapper.toPayload(job);

    try {
      const response = await lastValueFrom(
        this.httpService.put(apiUrl, payload, {
          headers: {
            Authorization: `Bearer ${this.accesstoken}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      return {
        status: 'SUCCESS',
        externalJobId: response.data.job_id,
      };
    } catch (error) {
      console.error(
        'Indeed Update Job Error:',
        error.response?.data || error.message,
      );
      return {
        status: 'FAILED',
        error: error.response?.data || 'Unknown error',
      };
    }
  }

  async closeJob(jobId: string): Promise<JobPostResult> {
    const apiUrl = `${this.JOB_BASE}/jobs/${jobId}/status`;
    const payload = { status: 'CLOSED' };

    try {
      const response = await lastValueFrom(
        this.httpService.patch(apiUrl, payload, {
          headers: {
            Authorization: `Bearer ${this.accesstoken}`,
          },
        }),
      );

      return {
        status: 'SUCCESS',
        externalJobId: response.data.job_Id,
      };
    } catch (error) {
      return {
        status: 'FAILED',
        error: error.response?.data || 'Unknown error',
      };
    }
  }

  async deleteJob(jobId: string): Promise<JobPostResult> {
    const apiUrl = `${this.JOB_BASE}/jobs/${jobId}`;

    try {
      const response = await lastValueFrom(
        this.httpService.delete(apiUrl, {
          headers: {
            Authorization: `Bearer ${this.accesstoken}`,
          },
        }),
      );

      return {
        status: 'SUCCESS',
        externalJobId: response.data.job_Id,
      };
    } catch (error) {
      return {
        status: 'FAILED',
        error: error.response?.data || 'Unknown error',
      };
    }
  }
}
