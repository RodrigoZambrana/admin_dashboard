import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm'

import { Address } from './Address'
import { Order } from './Order'

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  full_name: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  telephone: string

  @OneToMany(() => Address, (address) => address.customer, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  addresses: Address[]

  @OneToMany(() => Order, (order) => order.customer, {
    eager: true,
  })
  orders: Order[]
}
