import { Test } from '@nestjs/testing';

import { AppServiceImpl } from './app.service';

describe('AppService', () => {
  let service: AppServiceImpl;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppServiceImpl],
    }).compile();

    service = app.get<AppServiceImpl>(AppServiceImpl);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
