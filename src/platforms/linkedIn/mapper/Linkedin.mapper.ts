import { CreateJobOpeningDto } from '../../../job/dto/job.dto';

export class LinkedInMapper {
  static toPayload(job: CreateJobOpeningDto): any {
    return {
      jobPostingOperationType: job.jobPostingOperationType,

      title: job.postingTitle,
      description: {
        text: job.jobDescription,
      },

      location: {
        city: job.location.city,
        region: job.location.state,
        country: job.location.country,
      },

      jobPostingCompany: {
        company: job.companyPageUrl || 'urn:li:organization:12345678',
      },

      applyMethod: {
        type: 'COMPANY_WEBSITE',
        companyApplyUrl: job.companyApplyUrl,
      },

      employmentType: job.jobType,
      experienceLevel: job.experienceLevel,
      workplaceType: job.workplaceTypes,

      startDate: job.openingDate,
      endDate: job.targetHireDate,

      compensation:
        job.salaryRangeFrom && job.salaryRangeTo
          ? {
              currency: job.currency,
              range: {
                min: +job.salaryRangeFrom,
                max: +job.salaryRangeTo,
              },
              type: job.salaryType,
            }
          : undefined,

      skills: job.skills?.map((id) => this.mapSkillIdToName(id)),
      jobFunctions: [this.mapIndustryToFunction(job.industry)],

      postingVisibility: 'PUBLIC',
      listedAt: new Date().toISOString(),
      numberOfVacancies: job.numberOfVacancies,
    };
  }
  static mapIndustryToFunction(industry: string): string {
    const map = {
      IT: 'Information Technology',
      HR: 'Human Resources',
      SALES: 'Sales',
      MARKETING: 'Marketing',
    };
    return map[industry] || 'General';
  }

  static mapSkillIdToName(skillId: number): string {
    const skills = {
      1: 'Node.js',
      2: 'React',
      3: 'NestJS',
      4: 'MongoDB',
    };
    return skills[skillId] || 'General';
  }
}
