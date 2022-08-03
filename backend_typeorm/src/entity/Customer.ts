import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

import { Address } from "./Address";

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telephone: string;

  @OneToMany(() => Address, (address) => address.customer, {
    cascade: true,
  })
  addresses: Address[];

  addAddress(address: Address) {
    if (this.addresses == null) {
      this.addresses = new Array<Address>();
    }
    this.addresses.push(address);
  }

  //compras
}
