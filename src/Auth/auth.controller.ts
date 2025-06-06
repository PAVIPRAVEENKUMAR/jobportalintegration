import { Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  getaccesstoken,
  HandleCallbackDto,
  InitiateOAuthDto,
} from './dto/OAuth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('complex/oauth')
@Controller('complex/oauth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Get(':provider/initiate')
  @ApiOperation({ summary: 'Initiate OAuth flow with LinkedIn' })
  async initiateOAuth(@Query() query: InitiateOAuthDto) {
    const { provider, orgId } = query;

    const authUrl = this.authservice.generateOAuthUrl(provider, orgId);
    return authUrl;
  }

  @Get(':provider/callback')
  @ApiOperation({ summary: 'Handle OAuth callback from LinkedIn' })
  async handleCallback(@Query() query: HandleCallbackDto) {
    const { provider, code, state } = query;
    return this.authservice.handleCallback(provider, code, state);
  }

  @Get(':provider/token')
  @ApiOperation({ summary: 'Get access token from LinkedIn' })
  async getaccessToken(@Query() query: getaccesstoken) {
    const { provider, token } = query;
    return this.authservice.saveaccessToken(provider, token);
  }

  @Get(':provider/refreshtoken')
  @ApiOperation({ summary: 'Refresh access token from LinkedIn' })
  async refreshaccessToken(@Query() query: getaccesstoken) {
    const { provider, token } = query;
    return this.authservice.refreshAccessToken(provider, token);
  }

  @Post(':provider/revoke')
  @ApiOperation({ summary: 'Revoke access token from LinkedIn' })
  async revokeAccessToken(@Query() query: getaccesstoken) {
    const { provider, token } = query;
    return this.authservice.revokeaccessToken(provider, token);
  }
}
