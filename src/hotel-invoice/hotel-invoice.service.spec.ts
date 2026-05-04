import { Test, TestingModule } from '@nestjs/testing';
import { HotelInvoiceService } from './hotel-invoice.service';

describe('HotelInvoiceService', () => {
  let service: HotelInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelInvoiceService],
    }).compile();

    service = module.get<HotelInvoiceService>(HotelInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
