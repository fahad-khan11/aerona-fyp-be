import { BaseEntity } from "base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('Notifications')
export class Notification extends BaseEntity {
      @Column({
        nullable: true
    })
    text: string

    @Column({
        nullable: true
    })
    link: string

    @Column({
        nullable: true
    })
    seen: boolean

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    notificationFor: User;
}
