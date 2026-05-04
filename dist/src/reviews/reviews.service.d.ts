import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
export declare class ReviewsService {
    private reviewRepository;
    constructor(reviewRepository: Repository<Review>);
    create(createReviewDto: CreateReviewDto): Promise<CreateReviewDto & Review>;
    findAll(): Promise<Review[]>;
    findOne(id: number): Promise<Review>;
    findUSerReviews(id: number): Promise<Review[]>;
    findHotelReviews(id: number): Promise<Review[]>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
