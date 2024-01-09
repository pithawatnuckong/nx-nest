import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppServiceImpl } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppServiceImpl],
})
export class AppModule {}
