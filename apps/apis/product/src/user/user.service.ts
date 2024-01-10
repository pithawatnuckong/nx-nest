import {Injectable} from "@nestjs/common";
import * as bcrypt from "bcrypt"
import {SignUpRequest} from "../auth/auth.service";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

export type UserResponse = {
  id: string,
  username: string,
  password: string,
  email: string,
  latestUpdated: Date,
}

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async create(request: SignUpRequest): Promise<void> {
    const {password} = request;
    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const user: User = this.userRepository.create({...request, password: hashedPassword});
    await this.userRepository.save(user);
  }


  // Internal Method
  async findUserByUsernameOrEmail(username: string): Promise<User | null> {
    // Callback
    return await this.userRepository
      .createQueryBuilder('user')
      .where("user.username = :username", {"username": username})
      .orWhere("user.email = :email", {"email": username})
      .andWhere("user.deletedAt IS null")
      .getOne()
  }

  // Util
  private transformEntityToModel(entity: User): UserResponse {
    return {
      id: entity.id,
      username: entity.username,
      password: entity.password,
      email: entity.email,
      latestUpdated: entity.updatedAt || entity.createdAt
    };
  }
}
