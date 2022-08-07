import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'

import { Order_Entry } from './OrderEntry'
import { Customer } from './Customer'

export enum order_status {
  PARA_ARMAR = 'Para Armar',
  PARA_PEDIR = 'Para Pedir',
  PEDIDO = 'Pedido',
  PENDIENTE_INSTALACION = 'Para Instalar',
  PENDIENTE_PAGO = 'Pago Pendiente',
  FINALIZADA = 'Finalizada',
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  budget_id: number

  @Column({ nullable: true, default: 0 })
  advanced_payment: number //seña

  @Column({ default: 0 })
  production_cost: number /*Precio de costo*/

  @Column({ default: 0 })
  sub_total: number /*Monto sin IVA*/

  @Column({ default: 0 })
  discountPercentage: number

  @Column()
  additional_information: string

  @Column({
    type: 'enum',
    enum: order_status,
  })
  status: order_status

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer

  @OneToMany(() => Order_Entry, (order_entry) => order_entry.order, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  order_entries: Order_Entry[]

  // addEntry(order_entry: Order_Entry) {
  //   if (this.order_entries == null) {
  //     this.order_entries = new Array<Order_Entry>()
  //   }
  //   this.order_entries.push(order_entry)
  // }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
