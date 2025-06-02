import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsEnum,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The address of the job opening' })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The city of the job opening' })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The state of the job opening' })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The country of the job opening' })
  country: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The postal code of the job opening' })
  postalCode: string;
}

export class CreateJobOpeningDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  postingTitle: string;

  @IsNotEmpty()
  @IsNumber()
  jobTitleId: number;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @IsNotEmpty()
  @IsEnum(['IT', 'HR', 'FINANCE', 'MARKETING', 'SALES', 'OPERATIONS'])
  industry: 'IT' | 'HR' | 'FINANCE' | 'MARKETING' | 'SALES' | 'OPERATIONS';

  @IsNotEmpty()
  @IsEnum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN'])
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERN';

  @IsNotEmpty()
  @IsInt()
  numberOfVacancies: number;

  @IsNotEmpty()
  @IsDateString()
  openingDate: string;

  @IsNotEmpty()
  @IsDateString()
  targetHireDate: string;

  @IsNotEmpty()
  @IsEnum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN'])
  workExperience:
    | 'FULL_TIME'
    | 'PART_TIME'
    | 'CONTRACT'
    | 'TEMPORARY'
    | 'INTERN';

  @IsOptional()
  @IsNumber()
  educationId?: number;

  @IsOptional()
  @IsEnum(['HOURLY', 'SALARY', 'COMMISSION', 'OTHER'])
  salaryType?: 'HOURLY' | 'SALARY' | 'COMMISSION' | 'OTHER';

  @IsOptional()
  @IsString()
  salaryRangeFrom?: string;

  @IsOptional()
  @IsString()
  salaryRangeTo?: string;

  @IsOptional()
  @IsEnum(['USD', 'EUR', 'GBP', 'INR', 'JPY'])
  currency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY';

  @IsOptional()
  @IsBoolean()
  showSalaryInPost?: boolean;

  @IsOptional()
  @IsEnum(['REMOTE', 'ONSITE', 'HYBRID'])
  remoteType?: 'REMOTE' | 'ONSITE' | 'HYBRID';

  @ValidateNested()
  @Type(() => AddressDto)
  location: AddressDto;

  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;

  @IsOptional()
  @IsString()
  jobDescription?: string;

  @IsOptional()
  @IsString()
  jobResponsibilities?: string;

  @IsOptional()
  @IsString()
  jobBenefits?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  skills?: number[];
}
