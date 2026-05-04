import { BaseEntity } from "base.entity";
import { User } from "src/user/entities/user.entity";
export declare class Notification extends BaseEntity {
    text: string;
    link: string;
    seen: boolean;
    notificationFor: User;
}
