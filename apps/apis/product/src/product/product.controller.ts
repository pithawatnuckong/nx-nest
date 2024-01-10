import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateOrUpdateModel, ProductResponse, ProductService} from "./product.service";

@Controller('/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {
  }

  // Find all products
  @Get()
  async getProducts(): Promise<ProductResponse[] | null> {
    return await this.productService.findAllProducts();
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
