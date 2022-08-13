import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  address: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  phone: string

  @Column()
  role: string

  @Column()
  image: string

  @CreateDateColumn()
  joining_data: Date
}
