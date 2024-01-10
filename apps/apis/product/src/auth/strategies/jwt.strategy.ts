import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {JwtPayload} from "../auth.service";
import {configurationService} from "../../configuration/configuration.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configurationService.getJwtSecretKey(),
      algorithms: "HS256"
    })
  }

  async validate(payload: JwtPayload): Promise<any> {
    return {userId: payload.id, email: payload.email, username: payload.username}
  }
}
