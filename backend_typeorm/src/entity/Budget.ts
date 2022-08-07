import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Budget_Entry } from './BudgetEntry'

export enum budget_status {
  PENDIENTE = 'Pendiente',
  ACEPTADO = 'Aceptado',
  RECHAZADO = 'Rechazado',
  EXPIRADO = 'Expirado',
}

@Entity()
export class Budget extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  customer_id: number

  @Column({ nullable: true })
  customer_name: string

  @Column({ nullable: true })
  customer_telephone: string

  @Column({ nullable: true })
  customer_email: string

  @Column({ nullable: true })
  customer_address: string

  @Column({ default: 0 })
  discount_percentage: number

  @Column({ default: 15 })
  valid_days: number

  @Column({
    type: 'enum',
    enum: budget_status,
  })
  status: budget_status

  @OneToMany(() => Budget_Entry, (budget_entry) => budget_entry.budget, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  budget_entries: Budget_Entry[]

  addEntry() {
    if (this.budget_entries == null) {
      this.budget_entries = new Array<Budget_Entry>()
    }
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
