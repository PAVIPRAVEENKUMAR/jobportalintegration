import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
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
}

export class getaccesstoken {
  @ApiProperty()
  @IsEnum(ProviderEnum)
  provider: ProviderEnum;

  @ApiProperty()
  @IsString()
  token: string;
}
