import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProviderEnum } from 'src/common/provider.enum';
import { JobService } from './job.service';
import { CreateJobOpeningDto } from './dto/job.dto';
import { UpdateJobOpeningDto } from './dto/updatejob.dto';

@Controller('complex/job/{provider}/')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a job on the specified platform' })
  async createJob(
    @Param('provider') provider: ProviderEnum,
    @Body() jobData: CreateJobOpeningDto,
    @Body() body: any,
  ) {
    return this.jobService.createJob(provider, jobData, body);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update a job on the specified platform' })
  async updateJob(
    @Param('provider') provider: ProviderEnum,
    @Param('jobId') jobId: number,
    @Body() jobData: UpdateJobOpeningDto,
    @Body() body: any,
  ) {
    return this.jobService.updateJob(provider, jobId, jobData, body);
  }

  @Put('close')
  @ApiOperation({ summary: 'Close a job on the specified platform' })
  async closeJob(
    @Param('provider') provider: ProviderEnum,
    @Param('jobId') jobId: number,
    @Body() jobData: any,
  ) {
    return this.jobService.closeJob(provider, jobId, jobData);
  }
}
