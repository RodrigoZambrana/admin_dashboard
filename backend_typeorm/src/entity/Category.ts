import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { SubCategory } from "./SubCategory";
import { Product } from "./Product";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @Column({ default: false })
  showing: boolean;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  subCategories: SubCategory[];

  addSubCategory() {
    if (this.subCategories == null) {
      this.subCategories = new Array<SubCategory>();
    }
  }
}
