import { BaseEntity } from "base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('umrah')
export class Umrah extends BaseEntity {
    @Column({
        nullable: true
    })
    packageName: string;

    @Column({
        nullable: true
    })
    fromAirport: string;

     @Column({
        nullable: true
    })
    toAirport: string;

    @Column({
        nullable: true
    })
    singlePricing:number

    @Column({
        nullable: true
    })
    packageCode: string

    @Column({
        nullable: true
    })
    packageType: string

    @Column({
        nullable: true
    })
    duration: number

    @Column({
        nullable: true
    })
    startDate: Date

    @Column({
        nullable: true
    })
    endDate: Date

    @Column('text', {
        nullable: true,
        array: true,
    })
    citiesCovered: string[]

    @Column({
        nullable: true
    })
    shortDescription: string

    @Column({
        nullable: true
    })
    longDescription: string

    @Column({
        nullable: true
    })
    makkahHotelName: string

    @Column({
        nullable: true
    })
    makkahStarRating: string

    @Column({
        nullable: true
    })
    distanceFromHaram: number

    @Column({
        nullable: true
    })
    medinaHotelName: string

    @Column({
        nullable: true
    })
    medinaStarRating: string

    @Column({
        nullable: true
    })
    distanceFromMasjidNabwi: number

    @Column({
        nullable: true
    })
    roomTypes: string

    @Column('text', {
        nullable: true,
        array: true,
    })
    mealsIncluded: string[]

    @Column({
        nullable: true
    })
    flightIncluded: number

    @Column({
        nullable: true
    })
    airportTransfersIncluded: number

    @Column({
        nullable: true
    })
    interCityTransportType: string

    @Column({
        nullable: true
    })
    ziyaratIncluded: number

    @Column({
        nullable: true
    })
    tentativeDepartureDate: Date

    @Column({
        nullable: true
    })
    tentativeReturnDate: Date

    @Column({
        nullable: true
    })
    airLineName: string

    @Column({
        nullable: true
    })
    flightClass: string

    @Column({
        nullable: true
    })
    routeType: string

    @Column({
        nullable: true
    })
    departureCity: string

    @Column({
        nullable: true
    })
    arrivalCity: string

    @Column({
        nullable: true
    })
    flightDuration: number

    @Column({
        nullable: true
    })
    flightNotes: string

    @Column({
        nullable: true
    })
    currency: string

    @Column({
        nullable: true
    })
    doubleSharingPrice: number

    @Column({
        nullable: true
    })
    trippleSharingPrice: number

    @Column({
        nullable: true
    })
    quadSharingPrice: number

    @Column({
        nullable: true
    })
    discountPercent: number

    @Column({
        nullable: true
    })
    refundPolicy: string

    @Column({
        nullable: true
    })
    paymentTerms: string

    @Column({
        nullable: true
    })
    specialNotes: string

    @Column({
        nullable: true
    })
    vendorNotes: string


    @Column('text', {
        nullable: true,
        array: true,
    })
    extrasIncluded: string[]


    @Column('text', {
        nullable: true,
        array: true,
    })
    religiousServicesIncluded: string[]


      @Column('text', {
    nullable: true,
    array: true,
  })
  hotelImages: string[]


    @Column({
        nullable:true
    })
    coverImage: string

    @ManyToOne(()=>User,{
        onDelete:'CASCADE'
    })
    @JoinColumn()
    createdBy:User

    

}
