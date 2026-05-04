import { Test, TestingModule } from '@nestjs/testing';
import { UmrahbookingsController } from './umrahbookings.controller';
import { UmrahbookingsService } from './umrahbookings.service';

describe('UmrahbookingsController', () => {
  let controller: UmrahbookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UmrahbookingsController],
      providers: [UmrahbookingsService],
    }).compile();

    controller = module.get<UmrahbookingsController>(UmrahbookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
