import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { UmrahService } from './umrah.service';
import { CreateUmrahDto } from './dto/create-umrah.dto';
import { UpdateUmrahDto } from './dto/update-umrah.dto';
import { AnyFilesInterceptor, FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file-upload/file-upload.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UmrahbookingsService } from 'src/umrahbookings/umrahbookings.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { currentUser } from 'src/decorator/currentuser';


@ApiTags('umrah')
@Controller('umrah')
export class UmrahController {
  constructor(private readonly umrahService: UmrahService,
    private readonly fileUploadService: FileService,
    private readonly umrahBookingService: UmrahbookingsService
  ) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'coverImage', maxCount: 1 },
        { name: 'hotelImages', maxCount: 10 },
      ]
    )
  )
  async create(@Body() createUmrahDto: CreateUmrahDto,
    @UploadedFiles() files: {
      coverImage?: Express.Multer.File[],
      hotelImages?: Express.Multer.File[],
    },@currentUser() user:any
  ) {
    var images = [];
    if (files?.hotelImages?.length > 0) {
      for (const [index, file] of files.hotelImages.entries()) {
        var url: any;
        url = await this.fileUploadService.uploadToS3(file.buffer, file.originalname);
        images.push(url.Location);
      }
      const coverImage = await this.fileUploadService.uploadToS3(files.coverImage[0].buffer, files.coverImage[0].originalname);
      return this.umrahService.create({ ...createUmrahDto, hotelImages: images, coverImage: coverImage.Location,createdBy:user.userId });
    }
    else
      throw new BadRequestException('please upload 1 image at least')
  }

  @Get()
  findAll(@Query('packageType') packageType?: string,@Query('duration')duration? : string,@Query('city')city?:string) {
    const parsedduration = duration ? parseInt(duration, 10) : undefined;
    
    
    return this.umrahService.findAll(packageType,parsedduration,city);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/vendor/packages')
  findByVendor(@currentUser()user:any)
  {
    return this.umrahService.findByVendor(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.umrahService.findOne(+id);
  }

  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'coverImage', maxCount: 1 },
        { name: 'hotelImages', maxCount: 10 },
      ]
    )
  )
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateHotelDto: UpdateUmrahDto, @UploadedFiles() files: {
    coverImage?: Express.Multer.File[],
    hotelImages?: Express.Multer.File[],
  },) {
    if (files?.coverImage?.length > 0) {
      updateHotelDto.coverImage = (await this.fileUploadService.uploadToS3(files.coverImage[0].buffer, files.coverImage[0].originalname)).Location;

    }

    var images = [];
    if (files?.hotelImages?.length > 0) {
      for (const [index, file] of files.hotelImages.entries()) {
        var url: any;
        url = await this.fileUploadService.uploadToS3(file.buffer, file.originalname);
        images.push(url.Location);
      }
      if (Array.isArray(updateHotelDto.hotelImages) && updateHotelDto.hotelImages.length > 0) {
        updateHotelDto.hotelImages = [...updateHotelDto.hotelImages, ...images];

        
        return this.umrahService.update(+id, updateHotelDto);
      }
      else
        return this.umrahService.update(+id, { ...updateHotelDto, hotelImages: images });

    }
    else
      return this.umrahService.update(+id, updateHotelDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.umrahService.remove(+id);
  }

  @ApiBearerAuth()
  @Get('/dashboard/stats')
  @UseGuards(JwtAuthGuard)
  async getStats(@currentUser()user:any){
    const totalPackages=await this.umrahService.getStats(user.userId)
    const stats=await this.umrahBookingService.umrahBookingStats(user.userId)
    return {totalPackages,stats}

  }

  

}
