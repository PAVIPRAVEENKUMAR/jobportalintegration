import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IJobPlatformAdapter } from 'src/common/job.platform.adapter.interface';
import { HttpService } from '@nestjs/axios';
import { LinkedInJobPostPayload } from './interface/Linkedin.interface.dto';
import { JobPostResult } from '../../common/interfaces/JobPostresult.dto';
import { LinkedInMapper } from './mapper/Linkedin.mapper';
import { CreateJobOpeningDto } from 'src/job/dto/job.dto';

@Injectable()
export class LinkedinAdapter implements IJobPlatformAdapter {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private accesstoken: string;

  setAccessToken(token: string) {
    this.accesstoken = token;
    return this;
  }

  private API_BASE = 'https://api.linkedin.com/v2';

  private readonly tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';

  getauthurl() {
    const clientId = this.configService.get<string>('LINKEDIN_CLIENT_ID');

    const baseUrl = 'https://www.linkedin.com/oauth/v2/authorization';
    const scope = process.env.LINKEDIN_SCOPES;
    const state = process.env.LINKEDIN_STATE;
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI;

    const url = `${baseUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

    return url;
  }

  async exchangeCodeForToken(code: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.LINKEDIN_REDIRECT_URI!);
    params.append('client_id', process.env.LINKEDIN_CLIENT_ID!);
    params.append('client_secret', process.env.LINKEDIN_CLIENT_SECRET!);
    params.append('state', process.env.LINKEDIN_STATE!);

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.tokenUrl, params.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      );
      const { accessToken, expiresIn } = response.data;

      return {
        accessToken,
        expiresIn,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to exchange code for token: ${error.message}`,
      );
    }
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', process.env.LINKEDIN_CLIENT_ID!);
    params.append('client_secret', process.env.LINKEDIN_CLIENT_SECRET!);

    const response = await firstValueFrom(
      this.httpService.post(this.tokenUrl, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    );

    const { accessToken, expiresIn } = response.data;
    return {
      accessToken,
      expiresIn,
      status: 'Access token refreshed successfully',
    };
  }

  async revokeToken(token: string): Promise<any> {
    const revokeUrl = 'https://www.linkedin.com/oauth/v2/revoke';

    const params = new URLSearchParams();
    params.append('token', token);

    try {
      await firstValueFrom(
        this.httpService.post(revokeUrl, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              Buffer.from(
                `${process.env.LINKEDIN_CLIENT_ID}:${process.env.LINKEDIN_CLIENT_SECRET}`,
              ).toString('base64'),
          },
        }),
      );

      return { status: 'Token revoked successfully' };
    } catch (err) {
      throw new InternalServerErrorException(
        'Failed to revoke token',
        err?.response?.data || err.message,
      );
    }
  }

  async postJob(
    job: CreateJobOpeningDto,
    body: LinkedInJobPostPayload,
  ): Promise<JobPostResult> {
    const url = `${this.API_BASE}/jobPostings`;
    const payload = LinkedInMapper.toPayload(job, body);

    const headers = {
      Authorization: `Bearer ${this.accesstoken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, payload, { headers }),
      );

      return {
        externalJobId: response.data.id,
        status: 'SUCCESS',
      };
    } catch (error) {
      return {
        status: 'FAILED',
        error: error.response?.data || error.message,
      };
    }
  }

  async updateJob(
    jobId: number,
    job: CreateJobOpeningDto,
    extra: LinkedInJobPostPayload,
  ): Promise<JobPostResult> {
    const url = `${this.API_BASE}/jobPostings/${jobId}`;
    const payload = LinkedInMapper.toPayload(job, extra);
    const headers = {
      Authorization: `Bearer ${this.accesstoken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.put(url, payload, { headers }),
      );
      return {
        externalJobId: response.data.id,
        status: 'SUCCESS',
      };
    } catch (error) {
      return {
        status: 'FAILED',
        error: error.response?.data || error.message,
      };
    }
  }

  async closeJob(
    jobId: number,
    job: LinkedInJobPostPayload,
  ): Promise<JobPostResult> {
    const url = `${this.API_BASE}/jobPostings/${jobId}`;
    const payload = {
      jobPostingOperationType: 'CLOSE',
      externalJobPostingId: job.externalJobPostingId,
    };
    const headers = {
      Authorization: `Bearer ${this.accesstoken}`,
      'Content-Type': 'application/json',
    };
    try {
      const response = await firstValueFrom(
        this.httpService.put(url, payload, { headers }),
      );
      return {
        externalJobId: response.data.id,
        status: 'SUCCESS',
      };
    } catch (error) {
      return {
        status: 'FAILED',
        error: error.response?.data || error.message,
      };
    }
  }
}
