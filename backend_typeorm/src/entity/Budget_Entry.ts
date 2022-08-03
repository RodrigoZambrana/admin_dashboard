import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Budget } from "./Budget";

@Entity()
export class Budget_Entry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: number;

  @Column({ nullable: true })
  length: number;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  advance: number;

  @Column()
  quantity: number;

  @Column()
  unit_cost: number;

  @Column()
  additional_information: string;

  @ManyToOne(() => Budget, (budget) => budget.budget_entries)
  budget: Budget;
}
