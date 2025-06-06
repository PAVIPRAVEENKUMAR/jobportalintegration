import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ProviderEnum } from 'src/common/provider.enum';

export class InitiateOAuthDto {
  @ApiProperty()
  @IsEnum(ProviderEnum)
  provider: ProviderEnum;

  @ApiProperty()
  @IsString()
  orgId: string;
}

export class HandleCallbackDto {
  @ApiProperty()
  @IsEnum(ProviderEnum)
  provider: ProviderEnum;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  state: string;
}

export class getaccesstoken {
  @ApiProperty()
  @IsEnum(ProviderEnum)
  provider: ProviderEnum;

  @ApiProperty()
  @IsString()
  token: string;
}

export class UpdateTokenDto {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiProperty()
  @IsDateString()
  expiresAt: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  refreshTokenExpiresAt?: string;
}
