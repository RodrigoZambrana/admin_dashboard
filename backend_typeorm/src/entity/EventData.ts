import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class EventData extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Subject: string;

  @Column({ nullable: true })
  Location: string;

  @Column()
  StartTime: Date;

  @Column()
  EndTime: Date;

  @Column({ default: false })
  isAllDay: Boolean;

  @Column({ default: "1aaa55" })
  CategoryColor: String;
}
