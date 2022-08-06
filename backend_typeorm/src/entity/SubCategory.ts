import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Category } from './Category'
import { Product } from './Product'

@Entity()
export class SubCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  image_url: string

  @Column('text', { array: true })
  images: string[]

  @Column()
  description: string

  @Column()
  aditional_information: string

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category

  @OneToMany(() => Product, (product) => product.category, {
    eager: true,
  })
  products: Product[]
}
