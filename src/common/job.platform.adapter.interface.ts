export interface IJobPlatformAdapter{
    getauthurl(params: {orgId: string;redirectUri: string;scopes?: string[];state?: string;}): string;
    exchangeCodeForToken(code:string,state?:string): Promise<any>;
    exchangeToken(code:string):Promise<any>;
    refreshToken(refreshToken:string):Promise<any>;
    revokeToken(token:string):Promise<any>;

    postJob(job:any):Promise<any>;
    updateJob(jobId:number, job:any):Promise<any>;
    closeJob(jobId:number):Promise<any>;
    deleteJob(jobId:number):Promise<any>;
}