import { Test, TestingModule } from '@nestjs/testing';
import { UmrahService } from './umrah.service';

describe('UmrahService', () => {
  let service: UmrahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UmrahService],
    }).compile();

    service = module.get<UmrahService>(UmrahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
