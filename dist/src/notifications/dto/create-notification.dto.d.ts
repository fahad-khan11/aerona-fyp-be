import { User } from "src/user/entities/user.entity";
export declare class CreateNotificationDto {
    text: string;
    link: string;
    seen: boolean;
    notificationFor: User;
}
