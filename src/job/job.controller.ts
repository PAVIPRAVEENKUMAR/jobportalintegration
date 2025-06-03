import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProviderEnum } from 'src/common/provider.enum';
import { JobService } from './job.service';
import { UpdateJobOpeningDto } from './dto/updatejob.dto';
import { CreateJobOpeningDto } from './dto/job.dto';

@ApiTags('complex/jobpostings')
@Controller('complex/job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('create/:provider')
  @ApiOperation({ summary: 'Create a job on the specified platform' })
  async createJob(
    @Param('provider') provider: ProviderEnum,
    @Body() body: CreateJobOpeningDto,
  ) {
    return this.jobService.createJob(provider, body);
  }

  @Put('update/:provider')
  @ApiOperation({ summary: 'Update a job on the specified platform' })
  async updateJob(
    @Param('provider') provider: ProviderEnum,
    @Param('jobId') jobId: string,
    @Body() jobData: UpdateJobOpeningDto,
  ) {
    return this.jobService.updateJob(provider, jobId, jobData);
  }

  @Put('close/:provider')
  @ApiOperation({ summary: 'Close a job on the specified platform' })
  async closeJob(
    @Param('provider') provider: ProviderEnum,
    @Param('jobId') jobId: string,
    @Param('accessToken') accessToken: string,
  ) {
    return this.jobService.closeJob(provider, jobId, accessToken);
  }
}
