import {Injectable, UnauthorizedException} from "@nestjs/common";
import {Strategy} from "passport-local";
import {PassportStrategy} from "@nestjs/passport";
import {AuthService} from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {
    super({usernameField: "username"});
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserAndPassword(username, password);
    if (!user) {
      throw new UnauthorizedException("ยูสเซอร์กับพาร์สเวิร์ดผิดป่าว");
    }
    return user;
  }

}
