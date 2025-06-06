import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OAuthTokenService {
  constructor(private prisma: PrismaService) {}

  async saveToken(
    provider: string,
    tokenData: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
      userId: string;
      refreshTokenExpiresAt?: Date;
    },
  ) {
    const expiresAt = new Date(Date.now() + tokenData.expiresIn * 1000);
    return this.prisma.oAuthtoken.upsert({
      where: { userId_provider: { userId: tokenData.expiresIn, provider } },
      update: {
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
        expiresAt,
        refreshTokenExpiresAt: tokenData.refreshTokenExpiresAt,
      },
      create: {
        userId: tokenData.userId,
        provider,
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
        expiresAt,
        refreshTokenExpiresAt: tokenData.refreshTokenExpiresAt,
      },
    });
  }

  async getLatesttoken(provider: string, userId?: string) {
    return await this.prisma.oAuthtoken.findfirst({
      where: {
        provider,
        userId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
