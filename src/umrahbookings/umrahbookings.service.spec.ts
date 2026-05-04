import { Test, TestingModule } from '@nestjs/testing';
import { UmrahbookingsService } from './umrahbookings.service';

describe('UmrahbookingsService', () => {
  let service: UmrahbookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UmrahbookingsService],
    }).compile();

    service = module.get<UmrahbookingsService>(UmrahbookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
