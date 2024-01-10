import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";

export type JwtPayload = {
  id: string,
  username: string,
  email: string
}

export type SignUpRequest = {
  username: string,
  email: string,
  password: string,
}

export type SignInRequest = {
  username: string,
  password: string
}

export type SignInResponse = {
  accessToken: string,
  refreshToken?: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
  }

  async signIn(request: SignInRequest): Promise<SignInResponse> {
    const {username, password} = request;

    if (!username.trim() || !password.trim()) {
      throw new BadRequestException("ใส่ยูสเซอร์กับพาสเวิร์ดด้วยดิวะ");
    }

    const user: User = await this.userService.findUserByUsernameOrEmail(username);

    if (!user) {
      throw new UnauthorizedException("ยูสเซอร์ปลอม? หาไม่เจอ");
    }

    const isValidPassword: boolean = await user.validatePassword(password);

    if (!isValidPassword) {
      throw new UnauthorizedException("เดายูสเซอร์? รหัสผิด");
    }

    const payload: JwtPayload = {id: user.id, username: user.username, email: user.email};
    const accessToken: string = await this.jwtService.signAsync(payload);

    return {accessToken};
  }

  // for strategy
  async validateUserAndPassword(username: string, password: string): Promise<any> {
    const user: User = await this.userService.findUserByUsernameOrEmail(username);
    if (user && (await user.validatePassword(password))) {
      const {password, ...response} = user
      return response;
    }
    return null
  }
}
