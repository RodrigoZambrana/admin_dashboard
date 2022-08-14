import { Request, Response } from "express";
import { Budget_Entry } from "../entity/BudgetEntry";
import { Budget } from "../entity/Budget";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { AppDataSource } from "../db";

const Budget_EntryRepository = AppDataSource.getRepository(Budget_Entry);
const budgetRepository = AppDataSource.getRepository(Budget);

export const addBudget_Entry = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const budget = await budgetRepository.findOneById(id);
    if (budget !== null) {
      let newBudget_Entry = new Budget_Entry();
      newBudget_Entry = req.body;
      const errors = await validate(newBudget_Entry);
      if (errors.length > 0) {
        throw new Error(`Validation failed!`);
      } else {
        budget.budget_entries.push(newBudget_Entry);
        await budget.save();
        res.status(200).json({
          message: "Budget_Entry  Successfully Added!",
        });
      }
    } else {
      res.status(404).send({ message: "Budget_Entry id not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

//categories and products of Budget_Entry
export const getAllBudget_Entry = async (req: Request, res: Response) => {
  try {
    const subCategories = await Budget_EntryRepository.find();
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getBudget_EntryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const search_Budget_Entry = await Budget_EntryRepository.find({
      where: {
        id: id,
      },
    });

    if (search_Budget_Entry != null) {
      res.json(search_Budget_Entry);
    } else {
      res.status(404).send({ message: "Budget_Entry id not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const updateBudget_Entry = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const search_Budget_Entry = await Budget_EntryRepository.find({
      where: {
        id: id,
      },
    });
    if (search_Budget_Entry != null) {
      const {
        product_name,
        length,
        width,
        height,
        advance,
        quantity,
        unit_cost,
        additional_information,
      } = req.body;
      const Budget_Entry = await Budget_EntryRepository.update(
        {
          id,
        },
        {
          product_name,
          length,
          width,
          height,
          advance,
          quantity,
          unit_cost,
          additional_information,
        }
      );
      res.status(200).json({
        message: "Budget_Entry  Successfully Updated!",
      });
    } else {
      res.status(404).send({ message: "Budget_Entry not found!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Budget_Entry not found!" });
  }
};

export const deleteBudget_Entry = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const Budget_Entry = await Budget_EntryRepository.findOneById(id);
    if (Budget_Entry !== null) {
      await Budget_EntryRepository.delete({ id });
      res.status(200).send({
        message: "Budget_Entry Deleted Successfully!",
      });
    } else {
      res.status(404).send({ message: "Budget_Entry not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  addBudget_Entry,
  getAllBudget_Entry,
  getBudget_EntryById,
  updateBudget_Entry,
  deleteBudget_Entry,
};
