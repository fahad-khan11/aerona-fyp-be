import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserService } from 'src/user/user.service';
export declare class ReviewsController {
    private readonly reviewsService;
    private readonly usersService;
    constructor(reviewsService: ReviewsService, usersService: UserService);
    create(createReviewDto: CreateReviewDto, user: any): Promise<CreateReviewDto & import("./entities/review.entity").Review>;
    findAll(): Promise<import("./entities/review.entity").Review[]>;
    findOne(id: string): Promise<import("./entities/review.entity").Review>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    findAllUserReviews(user: any): Promise<import("./entities/review.entity").Review[]>;
    findAllHotelReviews(id: string): Promise<import("./entities/review.entity").Review[]>;
}
