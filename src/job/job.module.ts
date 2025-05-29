import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JobAdapterFactory } from "src/common/job-adapter.factory";
import { LinkedinAdapter } from "src/platforms/linkedIn/linkedin.adapter";


@Module({
    imports:[HttpModule],
    providers:[LinkedinAdapter, JobAdapterFactory],
    exports:[JobAdapterFactory]
})

export class Jobmodule {}