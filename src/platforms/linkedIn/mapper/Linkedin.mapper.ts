import { CreateJobOpeningDto } from '../../../job/dto/job.dto';
import { LinkedInJobPostPayload } from '../interface/Linkedin.interface.dto';

export class LinkedInMapper {
  static toPayload(
    job: CreateJobOpeningDto,
    extra: LinkedInJobPostPayload,
  ): any {
    return {
      jobPostingOperationType: extra.jobPostingOperationType,
      externalJobPostingId: extra.externalJobPostingId,
      companyApplyUrl: extra.companyApplyUrl,
      companyName: extra.companyName,
      companyPageUrl: extra.companyPageUrl,
      companyJobCode: extra.companyJobCode,
      posterEmail: extra.posterEmail,
      availability: extra.availability,
      employmentStatus: extra.employmentStatus,
      experienceLevel: extra.experienceLevel,
      workplaceTypes: extra.workplaceTypes,

      title: job.postingTitle,
      description: job.jobDescription,
      listedAt: new Date().toISOString(),

      location: `${job.location.city}, ${job.location.state}, ${job.location.country}`,

      jobType: job.jobType,
      remoteType: job.remoteType,
      numberOfVacancies: job.numberOfVacancies,

      salary: {
        from: job.salaryRangeFrom,
        to: job.salaryRangeTo,
        currency: job.currency,
        salaryType: job.salaryType,
      },

      responsibilities: job.jobResponsibilities,
      benefits: job.jobBenefits,
      urgent: job.isUrgent,
      startDate: job.openingDate,
      endDate: job.targetHireDate,
    };
  }
}
