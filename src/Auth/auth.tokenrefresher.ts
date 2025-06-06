import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { subMinutes, isBefore } from 'date-fns';
import { LinkedinAdapter } from 'src/platforms/linkedIn/linkedin.adapter';
import { IndeedAdapter } from 'src/platforms/indeed/indeed.adapter';

@Injectable()
export class TokenRefreshService {
  private readonly logger = new Logger(TokenRefreshService.name);

  constructor(
    private prisma: PrismaService,
    private linkedin: LinkedinAdapter,
    private indeed: IndeedAdapter,
  ) {}

  @Cron('*/30 * * * *')
  async refreshTokens() {
    const tokens = await this.prisma.oAuthToken.findMany();

    for (const token of tokens) {
      const now = new Date();
      const threshold = subMinutes(token.expiresAt, 10);
      if (isBefore(now, threshold)) continue;

      try {
        let newToken;
        if (token.provider === 'linkedin') {
          newToken = await this.linkedin.refreshToken(token.refreshToken);
        } else if (token.provider === 'indeed') {
          newToken = await this.indeed.refreshToken(token.refreshToken);
        }

        await this.prisma.oAuthToken.update({
          where: { id: token.id },
          data: {
            accessToken: newToken.accessToken,
            expiresAt: newToken.expiresAt,
            refreshToken: newToken.refreshToken,
            refreshTokenExpiresAt: newToken.refreshTokenExpiresAt,
          },
        });

        this.logger.log(`Refreshed token for provider: ${token.provider}`);
      } catch (err) {
        this.logger.error(
          `Failed to refresh token for ${token.provider}: ${err.message}`,
        );
      }
    }
  }
}
