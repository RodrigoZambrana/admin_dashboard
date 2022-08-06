import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { SubCategory } from './SubCategory'

export enum selling_unit {
  SUQARE_METER = 'Metros Cuadrados',
  METER = 'Metros lineales',
  UNIT = 'Unidad',
}

export enum providers {
  VEROSOL = 'Verosol',
  PROPERFIL = 'Properfil',
  LIDASUR = 'Lidasur',
  URUCORTINAS = 'urucortinas',
}

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  price: number //precio de costo

  @Column()
  sale_price: number //precio de venta IVA incluido

  @Column()
  former_price: number //precio anterior-para peomociones

  @Column()
  stock: number

  @Column()
  image: string

  @Column('simple-array')
  tags: string[]

  @Column({
    type: 'enum',
    enum: providers,
  })
  provider: providers

  @Column({
    type: 'enum',
    enum: selling_unit,
  })
  unit: selling_unit

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.products)
  subcategory: SubCategory

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
