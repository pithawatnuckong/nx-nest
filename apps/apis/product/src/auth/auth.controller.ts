import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {AuthService, SignInRequest, SignInResponse, SignUpRequest} from "./auth.service";
import {UserService} from "../user/user.service";
import {HttpStatusCode} from "axios";

@Controller("/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }


  @HttpCode(HttpStatusCode.Created)
  @Post("/sign-up")
  async signUp(@Body() request: SignUpRequest): Promise<void> {
    return await this.userService.create(request)
  }

  @HttpCode(HttpStatusCode.Ok)
  @Post("/sign-in")
  async signIn(@Body() request: SignInRequest): Promise<SignInResponse> {
    return await this.authService.signIn(request)
  }
}
