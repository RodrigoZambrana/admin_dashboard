import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Category } from "./Category";
import { SubCategory } from "./SubCategory";

export enum selling_unit {
  SUQARE_METER = "Metros Cuadrados",
  METER = "metros lineales",
  UNIT = "unidad",
}

export enum providers {
  VEROSOL = "Verosol",
  PROPERFIL = "Properfil",
  LIDASUR = "Lidasur",
  URUCORTINAS = "urucortinas",
}

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number; //precio sin IVA

  @Column()
  fomer_price: number; //precio anterior-para peomociones

  @Column()
  stock: number;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  create_date: Date;

  @Column()
  update_date: Date;

  @Column()
  aditional_information: string;

  @Column({
    type: "enum",
    enum: providers,
  })
  providers: providers;

  @Column({
    type: "enum",
    enum: selling_unit,
  })
  unit: selling_unit;

  @Column()
  products: string;

  @ManyToOne((type) => Category, (category) => category.products)
  category: Category;

  @ManyToOne((type) => SubCategory, (subcategory) => subcategory.products)
  subcategory: SubCategory;
}
