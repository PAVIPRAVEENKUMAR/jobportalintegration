import { Injectable } from '@nestjs/common';
import { JobAdapterFactory } from 'src/common/job-adapter.factory';
import { ProviderEnum } from 'src/common/provider.enum';
import { OAuthTokenService } from './oauthtoken.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jobAdapterFactory: JobAdapterFactory,
    private readonly oauthTokenService: OAuthTokenService,
  ) {}

  async generateOAuthUrl(provider: ProviderEnum, orgId: string) {
    if (!orgId) {
      throw new Error('orgId is required');
    }
    const adapter = this.jobAdapterFactory.getadapter(provider);
    return adapter.getauthurl();
  }

  async handleCallback(provider: ProviderEnum, code: string, state: string) {
    if (!code || !provider) {
      throw new Error('code and provider are required parameters');
    }

    const adapter = this.jobAdapterFactory.getadapter(provider);
    const response = await adapter.exchangeCodeForToken(code, state);

    await this.oauthTokenService.saveToken(provider, {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      expiresIn: response.expires_in,
      userId: response.userId,
      refreshTokenExpiresAt: response.refreshTokenExpiresAt,
    });
    return response;
  }

  async refreshAccessToken(provider: ProviderEnum, token: string) {
    if (!provider || !token) {
      throw new Error('provider or token are not found');
    }

    const adapter = this.jobAdapterFactory.getadapter(provider);
    const newToken = await adapter.refreshToken(token);
    return newToken;
  }

  async revokeaccessToken(provider: ProviderEnum, token: string) {
    const adapter = this.jobAdapterFactory.getadapter(provider);
    return adapter.revokeToken(token);
  }
}
