import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";

export class CreateUmrahDto {
  @ApiProperty()

  packageName: string;

  @ApiProperty()

  packageCode: string

  @ApiProperty()

  packageType: string

  @ApiProperty()

  duration: number

  @ApiProperty()

  startDate: Date

  @ApiProperty()

  endDate: Date

  @ApiProperty()

  citiesCovered: string[]

  @ApiProperty()

  shortDescription: string

  @ApiProperty()

  longDescription: string

  @ApiProperty()

  makkahHotelName: string

  @ApiProperty()

  makkahStarRating: string

  @ApiProperty()
  singlePricing?: number

  @ApiProperty()

  distanceFromHaram: number

  @ApiProperty()

  medinaHotelName: string

  @ApiProperty()

  medinaStarRating: string

  @ApiProperty()

  distanceFromMasjidNabwi: number

  @ApiProperty()

  roomTypes: string

  @ApiProperty()

  mealsIncluded: string[]

  @ApiProperty()

  flightIncluded: number

  @ApiProperty()

  airportTransfersIncluded: number

  @ApiProperty()

  interCityTransportType: string

  @ApiProperty()

  ziyaratIncluded: number

  @ApiProperty()

  tentativeDepartureDate: Date

  @ApiProperty()

  tentativeReturnDate: Date

  @ApiProperty()

  airLineName: string

  @ApiProperty()

  flightClass: string

  @ApiProperty()

  routeType: string

  @ApiProperty()

  departureCity: string

  @ApiProperty()

  arrivalCity: string

  @ApiProperty()

  flightDuration: number

  @ApiProperty()

  flightNotes: string

  @ApiProperty()

  currency: string

  @ApiProperty()

  doubleSharingPrice: number

  @ApiProperty()

  trippleSharingPrice: number

  @ApiProperty()

  quadSharingPrice: number

  @ApiProperty()

  discountPercent: number

  @ApiProperty()

  refundPolicy: string

  @ApiProperty()

  paymentTerms: string

  @ApiProperty()

  specialNotes: string

  @ApiProperty()

  vendorNotes: string


  @ApiProperty()

  extrasIncluded: string[]


  @ApiProperty()

  religiousServicesIncluded: string[]

  @ApiProperty()
  fromAirport?: string;

  @ApiProperty()
  toAirport?: string;



  hotelImages?: string[]



  coverImage?: string

  createdBy: User
}
