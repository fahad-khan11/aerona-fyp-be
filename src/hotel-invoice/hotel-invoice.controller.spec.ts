import { Test, TestingModule } from '@nestjs/testing';
import { HotelInvoiceController } from './hotel-invoice.controller';
import { HotelInvoiceService } from './hotel-invoice.service';

describe('HotelInvoiceController', () => {
  let controller: HotelInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelInvoiceController],
      providers: [HotelInvoiceService],
    }).compile();

    controller = module.get<HotelInvoiceController>(HotelInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
