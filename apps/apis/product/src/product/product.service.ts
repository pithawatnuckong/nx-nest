import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {Repository} from "typeorm";

export type ProductResponse = {
  id: string,
  name: string,
  price: number,
  quantity: number,
  latestUpdated: Date,
}

export type CreateOrUpdateModel = {
  id?: string,
  name: string,
  price: number,
  quantity: number
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {
  }

  async findProductById(id: string): Promise<ProductResponse> {
    // Async & Await
    // const product = await this.productRepository.findOne({
    //   where: {
    //     deletedAt: null,
    //     id: id.toString()
    //   }
    // })
    //
    // return this.transformEntityToModel(product)

    // Callback
    return this.productRepository.findOne({
      where: {
        deletedAt: null,
        id: id.toString()
      }
    }).then(entity => this.transformEntityToModel(entity))
  }

  async insertProduct(request: CreateOrUpdateModel): Promise<{ id: string }> {
    const product: Product = this.productRepository.create({...request, createdAt: Date.now()})
    await this.productRepository.save(product)
    return {id: product.id}
  }

  async findAllProducts(): Promise<ProductResponse[] | null> {
    // Async & Await
    // const products: Product[] = await this.productRepository.find({
    //   where: {
    //     deletedAt: null
    //   },
    //   order: {
    //     createdAt: "ASC"
    //   }
    // })
    //
    // return products.map(product => this.transformEntityToModel(product))

    // Callback
    return this.productRepository.find({
      where: {
        deletedAt: null
      },
      order: {
        createdAt: "ASC"
      }
    }).then(entities => entities.map(entity => this.transformEntityToModel(entity)))
  }


  // Util
  private transformEntityToModel(entity: Product): ProductResponse {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
      quantity: entity.quantity,
      latestUpdated: entity.updatedAt || entity.createdAt
    }
  }
}
