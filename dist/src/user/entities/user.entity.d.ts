import { BaseEntity } from 'base.entity';
export declare enum Status {
    PENDING = "pending",
    APPROVED = "approved",
    BLOCKED = "blocked"
}
export declare class User extends BaseEntity {
    name: string;
    password: string;
    email: string;
    phone: string;
    role: Role;
    isEmailVerified: boolean;
    status: Status;
    verificationCode: string;
    permissions: string[];
}
export declare enum Role {
    VENDOR = "vendor",
    USER = "user",
    ADMIN = "admin",
    SUPPORT = "support",
    CARRENTAL = "carrental",
    PROPERTY = "property",
    AGENT = "agent",
    UMRAH = "umrah"
}
