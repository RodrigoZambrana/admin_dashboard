import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import { Order } from './Order'
import { Product } from './Product'

@Entity()
export class Order_Entry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  width: number

  @Column({ nullable: true })
  length: number

  @Column({ nullable: true })
  height: number

  @Column({ nullable: true })
  advance: number

  @Column({ default: 0 })
  quantity: number

  @Column({ default: 0 })
  unit_cost: number /*costo unitario*/

  @Column()
  additional_information: string

  @ManyToOne(() => Order, (order) => order.order_entries)
  order: Order

  @ManyToOne(() => Product, (product) => product.order_entries)
  product: Product
}
