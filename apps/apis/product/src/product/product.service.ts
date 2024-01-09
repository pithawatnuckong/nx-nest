import {Injectable} from '@nestjs/common';

@Injectable()
export class ProductService {
  greeting(): { message: string } {
    return {message: "Hi there"};
  }
}
