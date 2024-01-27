import {ProductEntity} from "../models";

export interface IProductRepository {
  FindById(id: number): ProductEntity;
  FindAll(): ProductEntity[];
}
