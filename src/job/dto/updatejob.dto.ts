import { PartialType } from '@nestjs/swagger';
import { CreateJobOpeningDto } from './job.dto';

export class UpdateJobOpeningDto extends PartialType(CreateJobOpeningDto) {}
