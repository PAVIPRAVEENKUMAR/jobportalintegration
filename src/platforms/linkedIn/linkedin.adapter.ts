import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { IJobPlatformAdapter } from "src/common/job.platform.adapter.interface";
import { HttpService } from '@nestjs/axios';


@Injectable()
export class LinkedinAdapter implements IJobPlatformAdapter{
    constructor(private readonly configService: ConfigService,
                private readonly httpService: HttpService) {}
    
    private readonly tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';

    getauthurl(params: { orgId: string; redirectUri: string; scopes?: string[]; state?: string }){

        const clientId = this.configService.get<string>('LINKEDIN_CLIENT_ID');

        const baseUrl = 'https://www.linkedin.com/oauth/v2/authorization';
        const defaultScopes = ['r_liteprofile', 'w_organization_social'];
        const scope = (params.scopes ?? defaultScopes).join(' ');
        const state = params.state ?? `state-${params.orgId}`;

        const url = `${baseUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(params.redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;

        return url;
    }


  async exchangeCodeForToken(code:string, state?:string):Promise<any>{
   const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.LINKEDIN_REDIRECT_URI!);
    params.append('client_id', process.env.LINKEDIN_CLIENT_ID!);
    params.append('client_secret', process.env.LINKEDIN_CLIENT_SECRET!);

    if(state){
        params.append('state', state);
    }

    try{
        const response = await firstValueFrom(
            this.httpService.post(this.tokenUrl, params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
        )
        const {accessToken, expiresIn} = response.data;

        return {
            accessToken,
            expiresIn,
            state
        }
    }catch (error) {
        throw new InternalServerErrorException(`Failed to exchange code for token: ${error.message}`)
  }
}

 async refreshToken(refreshToken: string): Promise<any> {

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', process.env.LINKEDIN_CLIENT_ID!);
    params.append('client_secret', process.env.LINKEDIN_CLIENT_SECRET!);
    
    const response = await firstValueFrom(
        this.httpService.post(this.tokenUrl, params.toString(), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 
        }),
    );

    const { accessToken, expiresIn } = response.data;
    return {
        accessToken,
        expiresIn, 
        status: 'Access token refreshed successfully'
    };
  }

  async revokeToken(token: string): Promise<any> {
  const revokeUrl = 'https://www.linkedin.com/oauth/v2/revoke';

  const params = new URLSearchParams();
    params.append('token', token);

  try {
    await firstValueFrom(
      this.httpService.post(revokeUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              `${process.env.LINKEDIN_CLIENT_ID}:${process.env.LINKEDIN_CLIENT_SECRET}`,
            ).toString('base64'),
        },
      }),
    );

    return { status: 'Token revoked successfully' };
  } catch (err) {
    throw new InternalServerErrorException(
      'Failed to revoke token',
      err?.response?.data || err.message,
    );
  }
}

  async exchangeToken(code: string):Promise<any>{
    return {};
  }
  async postJob(job:string):Promise<any>{
    return {};
  } 

  async updateJob(jobId:number, job:any):Promise<any>{
        return {};
  }

  async closeJob(jobId:number):Promise<any>{
    return {};
  }

  async deleteJob(jobId: number): Promise<any> {
    return {};
  }

}