import { Module } from '@nestjs/common';
import { UmrahbookingsService } from './umrahbookings.service';
import { UmrahbookingsController } from './umrahbookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Umrahbooking } from './entities/umrahbooking.entity';

@Module({
  controllers: [UmrahbookingsController],
  providers: [UmrahbookingsService],
  imports:[TypeOrmModule.forFeature([Umrahbooking])],
  exports:[UmrahbookingsService]
})
export class UmrahbookingsModule {}
