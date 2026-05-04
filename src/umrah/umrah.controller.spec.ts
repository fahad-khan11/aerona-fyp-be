import { Test, TestingModule } from '@nestjs/testing';
import { UmrahController } from './umrah.controller';
import { UmrahService } from './umrah.service';

describe('UmrahController', () => {
  let controller: UmrahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UmrahController],
      providers: [UmrahService],
    }).compile();

    controller = module.get<UmrahController>(UmrahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
