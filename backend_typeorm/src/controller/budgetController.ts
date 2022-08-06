import { Request, Response } from 'express'
import { Budget } from '../entity/Budget'
import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { AppDataSource } from '../db'

const BudgetRepository = AppDataSource.getRepository(Budget)

//budgets and  budget entries
export const getAllBudget = async (req: Request, res: Response) => {
  try {
    const budgets = await BudgetRepository.find({
      relations: ['budget_entries'],
    })
    res.json(budgets)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const addBudget = async (req: Request, res: Response) => {
  try {
    const {
      customer_id,
      customer_name,
      customer_telephone,
      customer_email,
      customer_address,
      discount_percentage,
      valid_days,
      status,
    } = req.body

    const newBudget = new Budget()
    newBudget.customer_id = customer_id
    newBudget.customer_name = customer_name
    newBudget.customer_telephone = customer_telephone
    newBudget.customer_email = customer_email
    newBudget.customer_address = customer_address
    newBudget.discount_percentage = discount_percentage
    newBudget.valid_days = valid_days
    newBudget.status = status

    const errors = await validate(newBudget)
    if (errors.length > 0) {
      throw new Error(`Validation failed!`)
    } else {
      await newBudget.save()
      res.status(200).json({
        message: 'Budget  Successfully Added!',
      })
    }
  } catch (error) {
    res.status(500).json({
      message: console.log(error),
    })
  }
}

export const getBudgetById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_Budget = await BudgetRepository.find({
      relations: {
        budget_entries: true,
      },
      where: {
        id: id,
      },
    })

    if (search_Budget != null) {
      res.json(search_Budget)
    } else {
      res.status(404).send({ message: 'Budget id not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const updateBudget = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_Budget = await BudgetRepository.find({
      where: {
        id: id,
      },
    })
    if (search_Budget != null) {
      const { name, image_url, showing } = req.body
      const budget = await Budget.update(
        {
          id,
        },
        {
          // name: name,
          // image_url: image_url,
          // showing: showing,
        },
      )
      res.status(200).json({
        message: 'Budget  Successfully Updated!',
      })
    } else {
      res.status(404).send({ message: 'Budget not found!' })
    }
  } catch (err) {
    res.status(404).send({ message: 'Budget not found!' })
  }
}

export const deleteBudget = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const Budget = await BudgetRepository.findOneById(id)
    if (Budget !== null) {
      await BudgetRepository.delete({ id })
      res.status(200).send({
        message: 'Budget Deleted Successfully!',
      })
    } else {
      res.status(404).send({ message: 'Budget not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

module.exports = {
  addBudget,
  getAllBudget,
  getBudgetById,
  updateBudget,
  deleteBudget,
}
