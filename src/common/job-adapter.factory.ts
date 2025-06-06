import { Injectable } from '@nestjs/common';
import { ProviderEnum } from './provider.enum';
import { IJobPlatformAdapter } from './job.platform.adapter.interface';
import { LinkedinAdapter } from 'src/platforms/linkedIn/linkedin.adapter';
import { IndeedAdapter } from 'src/platforms/indeed/indeed.adapter';

@Injectable()
export class JobAdapterFactory {
  constructor(
    private readonly linkedinAdapter: LinkedinAdapter,
    private readonly indeedAdapter: IndeedAdapter,
  ) {}

  getadapter(provider: ProviderEnum): IJobPlatformAdapter {
    switch (provider) {
      case ProviderEnum.LINKEDIN:
        return this.linkedinAdapter;

      case ProviderEnum.INDEED:
        return this.indeedAdapter;

      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  getAuthenticatedAdapter(
    provider: ProviderEnum,
    accesstoken: string,
  ): IJobPlatformAdapter {
    switch (provider) {
      case ProviderEnum.LINKEDIN:
        return this.linkedinAdapter.setAccessToken(accesstoken);

      case ProviderEnum.INDEED:
        return this.indeedAdapter.setAccessToken(accesstoken);

      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}
