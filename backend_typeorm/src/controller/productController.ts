import { Request, Response } from 'express'
import { Product } from '../entity/Product'
import { SubCategory } from '../entity/SubCategory'
import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { AppDataSource } from '../db'

const productRepository = AppDataSource.getRepository(Product)
const subCategoryRepository = AppDataSource.getRepository(SubCategory)

export const addProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const subCategory = await subCategoryRepository.findOneById(id)
    if (subCategory !== null) {
      let newProduct = new Product()
      newProduct = req.body
      const errors = await validate(newProduct)
      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        subCategory.products.push(newProduct)
        await subCategory.save()
        res.status(200).json({
          message: 'Product  Successfully Added!',
        })
      }
    } else {
      res.status(404).send({ message: 'SubCategory id not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

//categories and products of Product
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await productRepository.find({
      relations: {
        subcategory: true,
      },
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_Product = await productRepository.findOne({
      relations: {
        subcategory: true,
      },
      where: {
        id: id,
      },
    })

    if (search_Product != null) {
      res.json(search_Product)
    } else {
      res.status(404).send({ message: 'Product id not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_Product = await productRepository.find({
      where: {
        id: id,
      },
    })
    if (search_Product != null) {
      const {
        name,
        price,
        sale_price,
        stock,
        image,
        tags,
        provider,
        unit,
        description,
      } = req.body
      const Product = await productRepository.update(
        {
          id,
        },
        {
          name: name,
          price: price,
          sale_price: sale_price,
          stock: stock,
          image: image,
          tags: tags,
          provider: provider,
          unit: unit,
          description: description,
        },
      )
      res.status(200).json({
        message: 'Product  Successfully Updated!',
      })
    } else {
      res.status(404).send({ message: 'Product not found!' })
    }
  } catch (err) {
    res.status(404).send({ message: 'Product not found!' })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const Product = await productRepository.findOneById(id)
    if (Product !== null) {
      await productRepository.delete({ id })
      res.status(200).send({
        message: 'Product Deleted Successfully!',
      })
    } else {
      res.status(404).send({ message: 'Product not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const updateStatus = async (req: Request, res: Response) => {
  const newStatus = req.body.status
  const id = Number(req.params.id)
  const product = await productRepository.findOneById(id)
  if (product !== null) {
    product.showing = newStatus
    product.save()
    res.status(200).send({
      message: 'Status Successfully!',
    })
  } else {
    res.status(404).send({ message: 'Product not found!' })
  }
}

module.exports = {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStatus,
}
