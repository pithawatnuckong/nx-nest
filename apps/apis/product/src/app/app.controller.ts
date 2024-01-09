import {Controller, Get} from '@nestjs/common';

import { AppServiceImpl } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppServiceImpl) {}

  @Get()
  getData() {
    return this.appService.getData()
  }

}
