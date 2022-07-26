import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";
import { Product } from "./Product";

@Entity()
export class SubCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "categoryId" })
  categoryId: number;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @Column("simple-array")
  images: string[];

  @Column()
  description: string;

  @Column()
  additional_information: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @OneToMany(() => Product, (product) => product.subcategory, {
    eager: true,
    cascade: true,
    //onDelete: 'CASCADE',
  })
  products: Product[];

  addProduct() {
    if (this.products == null) {
      this.products = new Array<Product>();
    }
  }
}
