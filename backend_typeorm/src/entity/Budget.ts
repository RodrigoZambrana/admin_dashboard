import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

import { Budget_Entry } from "./Budget_Entry";

export enum budget_status {
  PENDIENTE = "Pendiente",
  ACEPTADO = "Aceptado",
  RECHAZADO = "Rechazado",
  EXPIRADO = "Expirado",
}

@Entity()
export class Budget extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  customer_id: number;

  @Column({ nullable: true })
  customer_name: string;

  @Column({ nullable: true })
  customer_telephone: string;

  @Column({ nullable: true })
  customer_email: string;

  @Column({ nullable: true })
  customer_address: string;

  @Column()
  created_date: Date;

  @Column({ default: 0 })
  discount_percentage: number;

  @Column({ default: 15 })
  valid_days: number;

  @Column({
    type: "enum",
    enum: budget_status,
    default: budget_status.PENDIENTE,
  })
  status: budget_status;

  @OneToMany(() => Budget_Entry, (budget_entry) => budget_entry.budget, {
    cascade: true,
  })
  budget_entries: Budget_Entry[];

  addEntry(budget_entry: Budget_Entry) {
    if (this.budget_entries == null) {
      this.budget_entries = new Array<Budget_Entry>();
    }
    this.budget_entries.push(budget_entry);
  }
}
