import { Module } from '@nestjs/common';
import { AppConfigModule } from './config.module';
import { Authmodule } from './Auth/auth.module';
import { Jobmodule } from './job/job.module';

@Module({
  imports: [AppConfigModule, 
            Authmodule,
            Jobmodule
  ],
})
export class AppModule {}