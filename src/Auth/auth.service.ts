import { Injectable } from '@nestjs/common';
import { JobAdapterFactory } from 'src/common/job-adapter.factory';
import { ProviderEnum } from 'src/common/provider.enum';

@Injectable()
export class AuthService {
  constructor(private readonly jobAdapterFactory: JobAdapterFactory) {}

  private readonly tokenStore = new Map<string, string>();

  generateOAuthUrl(provider: ProviderEnum, orgId: string) {
    if (!orgId) {
      throw new Error('orgId is required');
    }
    const adapter = this.jobAdapterFactory.getadapter(provider);
    return adapter.getauthurl();
  }

  handleCallback(provider: ProviderEnum, code: string) {
    if (!code || !provider) {
      throw new Error('code and provider are required parameters');
    }
    const adapter = this.jobAdapterFactory.getadapter(provider);
    return adapter.exchangeCodeForToken(code);
  }

  saveaccessToken(provider: ProviderEnum, token: string) {
    if (!provider || !token) {
      throw new Error('provider or token are not found');
    }

    this.tokenStore.set(provider, token);

    return {
      message: `${provider} access token saved successfully`,
      token,
    };
  }

  refreshAccessToken(provider: ProviderEnum, token: string) {
    if (!provider || !token) {
      throw new Error('provider or token are not found');
    }

    const adapter = this.jobAdapterFactory.getadapter(provider);
    return adapter.refreshToken(token);
  }

  revokeaccessToken(provider: ProviderEnum, token: string) {
    const adapter = this.jobAdapterFactory.getadapter(provider);
    return adapter.revokeToken(token);
  }
}
