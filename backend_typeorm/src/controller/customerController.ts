import { Request, Response } from 'express'
import { Customer } from '../entity/Customer'
import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { AppDataSource } from '../db'

const customerRepository = AppDataSource.getRepository(Customer)

export const addCustomer = async (req: Request, res: Response) => {
  try {
    const { full_name, email, telephone } = req.body
    const newCustomer = new Customer()

    newCustomer.email = email
    newCustomer.full_name = full_name
    newCustomer.telephone = telephone

    const errors = await validate(newCustomer)
    if (errors.length > 0) {
      throw new Error(`Validation failed!`)
    } else {
      await newCustomer.save()
      res.status(200).json({
        message: 'Customer  Successfully Added!',
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

//All customers
export const getAllCustomer = async (req: Request, res: Response) => {
  try {
    const customers = await customerRepository.find({
      relations: {
        addresses: true,
        orders: true,
      },
    })
    res.json(customers)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_customer = await customerRepository.find({
      relations: {
        orders: true,
        addresses: true,
      },
      where: {
        id: id,
      },
    })

    if (search_customer != null) {
      res.json(search_customer)
    } else {
      res.status(404).send({ message: 'Customer id not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_customer = await customerRepository.find({
      where: {
        id: id,
      },
    })
    if (search_customer != null) {
      const { full_name, email, telephone } = req.body
      const customer = await customerRepository.update(
        {
          id,
        },
        { full_name: full_name, email: email, telephone: telephone },
      )
      res.status(200).json({
        message: 'Customer  Successfully Updated!',
      })
    } else {
      res.status(404).send({ message: 'Customer not found!' })
    }
  } catch (err) {
    res.status(404).send({ message: 'Customer not found!' })
  }
}

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const customer = await customerRepository.findOneById(id)
    if (customer !== null) {
      await customerRepository.delete({ id })
      res.status(200).send({
        message: 'Customer Deleted Successfully!',
      })
    } else {
      res.status(404).send({ message: 'Customer not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

module.exports = {
  addCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
}
