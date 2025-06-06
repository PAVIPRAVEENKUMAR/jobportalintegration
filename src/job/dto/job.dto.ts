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
  @ApiProperty({ description: 'Street address' })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'City' })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'State' })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Country' })
  country: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Postal Code' })
  postalCode: string;
}

export class CreateJobOpeningDto {
  @IsNotEmpty()
  @IsEnum(['CREATE', 'UPDATE', 'CLOSE'])
  @ApiProperty({ enum: ['CREATE', 'UPDATE', 'CLOSE'] })
  jobPostingOperationType: 'CREATE' | 'UPDATE' | 'CLOSE';

  @IsString()
  @ApiProperty()
  externalJobPostingId?: string;

  @IsString()
  @ApiProperty()
  companyApplyUrl: string;

  @IsString()
  @ApiProperty()
  companyJobCode: string;

  @IsString()
  @ApiProperty()
  companyName: string;

  @IsString()
  @ApiProperty()
  companyPageUrl: string;

  @IsString()
  @ApiProperty()
  posterEmail: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  experienceLevel: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  workplaceTypes: string;

  @IsString()
  @ApiProperty({ required: false })
  accessToken?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  postingTitle: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  jobTitleId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  departmentId: number;

  @IsNotEmpty()
  @IsEnum(['IT', 'HR', 'FINANCE', 'MARKETING', 'SALES', 'OPERATIONS'])
  @ApiProperty({
    enum: ['IT', 'HR', 'FINANCE', 'MARKETING', 'SALES', 'OPERATIONS'],
  })
  industry: 'IT' | 'HR' | 'FINANCE' | 'MARKETING' | 'SALES' | 'OPERATIONS';

  @IsNotEmpty()
  @IsEnum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN'])
  @ApiProperty({
    enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN'],
  })
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERN';

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  numberOfVacancies: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  openingDate: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  targetHireDate: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  educationId?: number;

  @IsOptional()
  @IsEnum(['HOURLY', 'SALARY', 'COMMISSION', 'OTHER'])
  @ApiProperty({ enum: ['HOURLY', 'SALARY', 'COMMISSION', 'OTHER'] })
  salaryType?: 'HOURLY' | 'SALARY' | 'COMMISSION' | 'OTHER';

  @IsOptional()
  @IsString()
  @ApiProperty()
  salaryRangeFrom?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  salaryRangeTo?: string;

  @IsOptional()
  @IsEnum(['USD', 'EUR', 'GBP', 'INR', 'JPY'])
  @ApiProperty({ enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY'] })
  currency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY';

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  showSalaryInPost?: boolean;

  @IsOptional()
  @IsEnum(['REMOTE', 'ONSITE', 'HYBRID'])
  @ApiProperty({ enum: ['REMOTE', 'ONSITE', 'HYBRID'] })
  remoteType?: 'REMOTE' | 'ONSITE' | 'HYBRID';

  @ValidateNested()
  @Type(() => AddressDto)
  @ApiProperty({ type: AddressDto })
  location: AddressDto;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isUrgent?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  jobDescription?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  jobResponsibilities?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  jobBenefits?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty()
  skills?: number[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  postUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  contactName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Name of the source/platform posting the job' })
  sourceName?: string;
}
