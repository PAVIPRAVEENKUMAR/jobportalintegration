import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
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
    @Param('accesstoken') accesstoken: string,
  ) {
    return this.jobService.createJob(provider, body, accesstoken);
  }

  @Put('update/:provider')
  @ApiOperation({ summary: 'Update a job on the specified platform' })
  async updateJob(
    @Param('provider') provider: ProviderEnum,
    @Param('jobId') jobId: string,
    @Body() jobData: UpdateJobOpeningDto,
    @Param('accesstoken') accesstoken: string,
  ) {
    return this.jobService.updateJob(provider, jobId, jobData, accesstoken);
  }

  @Put('close/:provider')
  @ApiOperation({ summary: 'Close a job on the specified platform' })
  async closeJob(
    @Param('provider') provider: ProviderEnum,
    @Param('jobId') jobId: string,
    @Param('accesstoken') accesstoken: string,
  ) {
    return this.jobService.closeJob(provider, jobId, accesstoken);
  }

  @Delete('delete/:provider')
  @ApiOperation({ summary: 'Delete a job on the specified platform' })
  async deleteJob(
    @Param('provider') provider: ProviderEnum,
    @Param('jobId') jobId: string,
    @Param('accesstoken') accesstoken: string,
  ) {
    return this.jobService.deleteJob(provider, jobId, accesstoken);
  }
}
