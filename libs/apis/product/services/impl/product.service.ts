import {FindProductRequest, FindProductResponse, ProductEntity} from "../../models";
import {IProductService} from "../product.service";
import {Injectable} from "@nestjs/common";
import {ProductRepositoryImpl} from "../../repositories/impl/product.repository";

// @ts-ignore
@Injectable()
export class ProductServiceImpl implements IProductService {
  // @ts-ignore
  constructor(
    private readonly productRepository: ProductRepositoryImpl) {
  }

  FindProduct(request: FindProductRequest): FindProductResponse {
    if (request.id) {
      throw new Error("mai mee request")
    }

    let product = this.productRepository.FindById(request.id)


    return this.transformEntityToModel(product)

  }

  private transformEntityToModel(entity: ProductEntity): FindProductResponse {
    // TODO document why this method 'transformEntityToModel' is empty

    return {
      id: entity.id,
      name: entity.name
    }
  }

}
