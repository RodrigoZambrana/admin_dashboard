import { Request, Response } from 'express'
import { Address } from '../entity/Address'
import { Customer } from '../entity/Customer'
import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { AppDataSource } from '../db'

const AddressRepository = AppDataSource.getRepository(Address)
const customerRepository = AppDataSource.getRepository(Customer)

export const addAddress = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const customer = await customerRepository.findOneById(id)
    if (customer !== null) {
      let newAddress = new Address()
      newAddress = req.body
      const errors = await validate(newAddress)
      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        customer.addresses = [newAddress]
        await customer.save()
        res.status(200).json({
          message: 'Address  Successfully Added!',
        })
      }
    } else {
      res.status(404).send({ message: 'Category id not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

//categories and products of Address
export const getAllAddress = async (req: Request, res: Response) => {
  try {
    const subCategories = await AddressRepository.find({
      relations: ['products'],
    })
    res.json(subCategories)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const getAddressById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_Address = await AddressRepository.find({
      where: {
        id: id,
      },
    })

    if (search_Address != null) {
      res.json(search_Address)
    } else {
      res.status(404).send({ message: 'Address id not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_Address = await AddressRepository.find({
      where: {
        id: id,
      },
    })
    if (search_Address != null) {
      const { name, image_url, showing } = req.body
      const Address = await AddressRepository.update(
        {
          id,
        },
        {},
      )
      res.status(200).json({
        message: 'Address  Successfully Updated!',
      })
    } else {
      res.status(404).send({ message: 'Address not found!' })
    }
  } catch (err) {
    res.status(404).send({ message: 'Address not found!' })
  }
}

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const Address = await AddressRepository.findOneById(id)
    if (Address !== null) {
      await AddressRepository.delete({ id })
      res.status(200).send({
        message: 'Address Deleted Successfully!',
      })
    } else {
      res.status(404).send({ message: 'Address not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

module.exports = {
  addAddress,
  getAllAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
}
