import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ProviderEnum } from "src/common/provider.enum";


export class InitiateOAuthDto {
    @ApiProperty()
    @IsEnum(ProviderEnum)
    provider:ProviderEnum;

    @ApiProperty()
    @IsString()
    orgId: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ each: true })
    scopes?: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    state?: string;
}

export class HandleCallbackDto {

    @ApiProperty()
    @IsEnum(ProviderEnum)
    provider: ProviderEnum;

    @ApiProperty()
    @IsString()
    code: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    state?: string;

}

export class getaccesstoken {

    @ApiProperty()
    @IsEnum(ProviderEnum)
    provider:ProviderEnum;

    @ApiProperty()
    @IsString()
    token:string
}