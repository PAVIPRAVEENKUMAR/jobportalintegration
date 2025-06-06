import { CreateJobOpeningDto } from 'src/job/dto/job.dto';

export class IndeedMapper {
  static toPayload(job: CreateJobOpeningDto): any {
    return {
      body: {
        title: job.postingTitle,
        description: job.jobDescription,
        cityRegionPostal: job.location || '',
        benefits: job.jobBenefits,
      },
      metadata: {
        jobSource: {
          companyName: job.companyName,
          companyWebsite: job.companyPageUrl,
          sourceName: job.sourceName,
        },
        remoteType: job.remoteType,
        education: job.educationId,
        experience: job.experienceLevel,
        datePublished: job.openingDate,
        url: job.companyApplyUrl,
        numberOfHires: job.numberOfVacancies,
        expirationDate: job.targetHireDate,
        postUrl: job.postUrl,
        contacts: [
          {
            contactType: ['contact'],
            contactInfo: {
              name: job.contactName,
              email: job.posterEmail,
              phone: job.contactPhone,
            },
          },
        ],
      },
    };
  }
}
