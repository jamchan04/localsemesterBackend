import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface RegisterBody {
  username?: string;
  userId: string;
  email: string;
  password: string;
  state?: number;
}

interface LoginBody {
  userId: string;
  password: string;
}

interface RefreshBody {
  refreshToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterBody) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginBody) {
    return this.authService.login(body);
  }

  @Post('refresh')
  refresh(@Body() body: RefreshBody) {
    return this.authService.refreshTokens(body.refreshToken);
  }
}
