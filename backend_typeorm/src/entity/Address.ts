import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import { Customer } from './Customer'

export enum address_type {
  PERSONAL = 'Personal',
  FACTURACIÓN = 'Facturacion',
}

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  street: string

  @Column()
  number: string

  @Column({ nullable: true })
  apartment: string

  @Column({ nullable: true })
  corner: string

  @ManyToOne(() => Customer, (customer) => customer.addresses)
  customer: Customer

  @Column({
    type: 'enum',
    enum: address_type,
  })
  type: address_type
}
