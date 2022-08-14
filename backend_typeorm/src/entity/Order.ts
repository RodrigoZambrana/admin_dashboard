import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { Order_Entry } from "./OrderEntry";
import { Customer } from "./Customer";

export enum order_status {
  PENDING = "Pendiente",
  PENDING_INSTALL = "Para Instalar",
  FINALIZAD0 = "Finalizado",
  CANCELADO = "Cancelado",
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  budget_id: number;

  @Column({ nullable: true, default: 0 })
  advanced_payment: number; //seña

  @Column({ default: 0 })
  production_cost: number; /*Precio de costo*/

  @Column({ default: 0 })
  sub_total: number; /*Monto sin IVA*/

  @Column({ default: 0 })
  discount_percentage: number;

  @Column({ nullable: true })
  additional_information: string;

  @Column({
    type: "enum",
    enum: order_status,
  })
  status: order_status;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => Order_Entry, (order_entry) => order_entry.order, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  order_entries: Order_Entry[];

  addEntry() {
    if (this.order_entries == null) {
      this.order_entries = new Array<Order_Entry>();
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
