import {Controller, Get} from '@nestjs/common';
import {ProductService} from "./product.service";
import {configurationService} from "../configuration/configuration.service";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get()
  getGreeting(): { message: string } {
    return this.productService.greeting()
  }
}
