import { Module } from '@nestjs/common';
import { UmrahService } from './umrah.service';
import { UmrahController } from './umrah.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Umrah } from './entities/umrah.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { UmrahbookingsModule } from 'src/umrahbookings/umrahbookings.module';

@Module({
  controllers: [UmrahController],
  providers: [UmrahService],
  imports:[TypeOrmModule.forFeature([Umrah]),FileUploadModule,UmrahbookingsModule],
})
export class UmrahModule {}
