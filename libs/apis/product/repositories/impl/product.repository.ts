import {ProductEntity} from "../../models";
import {IProductRepository} from "../product.repository";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

// @ts-ignore
@Injectable("product-repository")
export class ProductRepositoryImpl implements IProductRepository {
  FindById(id: number): ProductEntity {
    return {
      id: 1,
      name: "string"
    }
  }

  FindAll(): ProductEntity[] {
    return [{
      id: 1,
      name: "string1"
    }, {
      id: 2,
      name: "string2"
    }]
  }

}
