import {Body, Controller, Get, HttpCode, Post, UseGuards} from '@nestjs/common';
import {AuthService, SignInRequest, SignInResponse, SignUpRequest} from "./auth.service";
import {UserService} from "../user/user.service";
import {HttpStatusCode} from "axios";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {Public} from "./public.decorator";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller("/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }


  @HttpCode(HttpStatusCode.Created)
  @Public()
  @Post("/sign-up")
  async signUp(@Body() request: SignUpRequest): Promise<void> {
    return await this.userService.create(request)
  }

  @HttpCode(HttpStatusCode.Ok)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("/sign-in")
  async signIn(@Body() request: SignInRequest): Promise<SignInResponse> {
    return await this.authService.signIn(request)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getGreeting(): string {
    return "hello you are in."
  }
}
