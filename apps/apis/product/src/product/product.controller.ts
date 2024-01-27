import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateOrUpdateModel, ProductResponse, ProductService} from "./product.service";
import {ProductServiceImpl} from "../../../../../libs/apis/product/services/impl/product.service";
import {FindProductRequest, FindProductResponse} from "../../../../../libs/apis/product/models";

@Controller('/products')
export class ProductController {
  constructor(
    private readonly productService: ProductServiceImpl
  ) {
  }

  // Find all products
  @Get()
  async getProducts(@Body() request: FindProductRequest): Promise<FindProductResponse | null> {
    return this.productService.FindProduct(request);
  }

  // Find product by ID xx
  @Get("/:id")
  async getProductById(@Param("id") id: string): Promise<ProductResponse> {
    return await this.productService.findProductById(id);
  }

  // Create product
  @Post("/create")
  async createProduct(@Body() request: CreateOrUpdateModel): Promise<{ id: string }> {
    console.log(request)
    return this.productService.insertProduct(request);
  }

}
