import { PartialType } from '@nestjs/mapped-types';
import { CreateUmrahbookingDto } from './create-umrahbooking.dto';

export class UpdateUmrahbookingDto extends PartialType(CreateUmrahbookingDto) {}
