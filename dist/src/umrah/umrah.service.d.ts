import { CreateUmrahDto } from './dto/create-umrah.dto';
import { UpdateUmrahDto } from './dto/update-umrah.dto';
import { Umrah } from './entities/umrah.entity';
import { Repository } from 'typeorm';
export declare class UmrahService {
    private readonly umrahRepository;
    constructor(umrahRepository: Repository<Umrah>);
    create(createUmrahDto: CreateUmrahDto): Promise<CreateUmrahDto & Umrah>;
    findAll(packageType: string, duration: number, city: string): Promise<Umrah[]>;
    findByVendor(id: number): Promise<Umrah[]>;
    findOne(id: number): Promise<Umrah>;
    update(id: number, updateUmrahDto: UpdateUmrahDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    getStats(id: number): Promise<number>;
}
