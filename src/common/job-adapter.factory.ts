import { Injectable } from "@nestjs/common";
import { ProviderEnum } from "./provider.enum";
import { IJobPlatformAdapter } from "./job.platform.adapter.interface";
import { LinkedinAdapter } from "src/platforms/linkedIn/linkedin.adapter";

@Injectable()
export class JobAdapterFactory {
    constructor(
        private readonly linkedinAdapter:LinkedinAdapter
    ){}
    getadapter(provider:ProviderEnum):IJobPlatformAdapter{
        switch(provider) {
            case ProviderEnum.LINKEDIN:
                return this.linkedinAdapter;
               
                default:
                    throw new Error('Unsupported provider: ${provider}');
        }
    }
}