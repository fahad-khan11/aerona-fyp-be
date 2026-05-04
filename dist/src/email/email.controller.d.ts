import { EmailService } from './email.service';
import { UpdateEmailDto } from './dto/update-email.dto';
import { CreateEmailDto } from './dto/create-email.dto';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(sendMailDto: CreateEmailDto): Promise<void>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEmailDto: UpdateEmailDto): string;
    remove(id: string): string;
}
