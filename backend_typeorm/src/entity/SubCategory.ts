import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { Product } from "./Product";

@Entity()
export class SubCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];
}
