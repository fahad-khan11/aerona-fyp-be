import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<CreateNotificationDto & import("./entities/notification.entity").Notification>;
    findAll(): Promise<import("./entities/notification.entity").Notification[]>;
    findUserNotification(user: any): Promise<import("./entities/notification.entity").Notification[]>;
    findOne(id: string): Promise<import("./entities/notification.entity").Notification>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
