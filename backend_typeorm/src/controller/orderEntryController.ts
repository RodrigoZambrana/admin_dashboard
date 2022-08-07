import { Request, Response } from 'express'
import { Order_Entry } from '../entity/OrderEntry'
import { Order } from '../entity/Order'
import { Product } from '../entity/Product'
import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { AppDataSource } from '../db'

const order_EntryRepository = AppDataSource.getRepository(Order_Entry)
const orderRepository = AppDataSource.getRepository(Order)
const productRepository = AppDataSource.getRepository(Product)

//categories and products of Budget_Entry
export const getAllOrder_Entry = async (req: Request, res: Response) => {
  try {
    const subCategories = await order_EntryRepository.find()
    res.json(subCategories)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const addOrder_Entry = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const productId = req.params.productId
    const order = await orderRepository.findOneById(id)
    const product = await productRepository.findOneById(id)

    if (order !== null) {
      if (product !== null) {
        const {
          length,
          width,
          height,
          advance,
          quantity,
          unit_cost,
          additional_information,
        } = req.body

        const newOrder_Entry = new Order_Entry()
        ;(newOrder_Entry.product = product),
          (newOrder_Entry.length = length),
          (newOrder_Entry.length = length),
          (newOrder_Entry.width = width),
          (newOrder_Entry.height = height),
          (newOrder_Entry.advance = advance),
          (newOrder_Entry.quantity = quantity),
          (newOrder_Entry.unit_cost = unit_cost),
          (newOrder_Entry.additional_information = additional_information)

        const errors = await validate(newOrder_Entry)
        if (errors.length > 0) {
          throw new Error(`Validation failed!`)
        } else {
          order.order_entries.push(newOrder_Entry)
          await order.save()
          res.status(200).json({
            message: 'Order_Entry Successfully Added!',
          })
        }
      } else {
        res.status(404).send({ message: 'product not found!' })
      }
    } else {
      res.status(404).send({ message: 'Order_Entry id not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const getOrder_EntryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_Order_Entry = await order_EntryRepository.find({
      where: {
        id: id,
      },
    })

    if (search_Order_Entry != null) {
      res.json(search_Order_Entry)
    } else {
      res.status(404).send({ message: 'Order_Entryid not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const updateOrder_Entry = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_Order_Entry = await order_EntryRepository.find({
      where: {
        id: id,
      },
    })
    if (search_Order_Entry != null) {
      const {
        length,
        width,
        height,
        advance,
        quantity,
        unit_cost,
        additional_information,
      } = req.body
      const Order_Entry = await order_EntryRepository.update(
        {
          id,
        },
        {
          length,
          width,
          height,
          advance,
          quantity,
          unit_cost,
          additional_information,
        },
      )
      res.status(200).json({
        message: 'Order_Entry Successfully Updated!',
      })
    } else {
      res.status(404).send({ message: 'Order_Entrynot found!' })
    }
  } catch (err) {
    res.status(404).send({ message: 'Order_Entrynot found!' })
  }
}

export const deleteOrder_Entry = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const Order_Entry = await order_EntryRepository.findOneById(id)
    if (Order_Entry !== null) {
      await order_EntryRepository.delete({ id })
      res.status(200).send({
        message: 'Order_EntryDeleted Successfully!',
      })
    } else {
      res.status(404).send({ message: 'Order_Entrynot found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

module.exports = {
  getAllOrder_Entry,
  addOrder_Entry,
  getOrder_EntryById,
  updateOrder_Entry,
  deleteOrder_Entry,
}
