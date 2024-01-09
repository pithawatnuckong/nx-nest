import {Injectable} from '@nestjs/common';


export type ProductModel = {
  name: string,
  price: number,

}

interface AppService {
  getData(): ProductModel
}

@Injectable()
export class AppServiceImpl implements AppService {

  getData(): ProductModel {
    return this.initialMessage();
  }


  private initialMessage(): ProductModel {
    return {
      name: "hello",
      price: 20.0
    }
  }
}

