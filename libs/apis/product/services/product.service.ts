import {FindProductRequest, FindProductResponse} from "../models";

export interface IProductService {
  FindProduct(request: FindProductRequest): FindProductResponse;
}

