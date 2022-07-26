import { Request, Response } from "express";
import { Order } from "../entity/Order";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { AppDataSource } from "../db";
import { Customer } from "../entity/Customer";

const orderRepository = AppDataSource.getRepository(Order);
const customerRepository = AppDataSource.getRepository(Customer);

//Orders and  Order entries
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderRepository.find({
      relations: {
        order_entries: true,
        customer: true,
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getAllOrdersByMonth = async (req: Request, res: Response) => {
  try {
    const orders = await orderRepository.find({
      relations: {
        order_entries: true,
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const addOrder = async (req: Request, res: Response) => {
  try {
    const {
      customer_id,
      budget_id,
      advanced_payment,
      production_cost,
      sub_total,
      discount_percentage,
      additional_information,
      status,
    } = req.body;

    const id = Number(customer_id);
    const search_Customer = await customerRepository.findOneById(id);

    if (search_Customer != null) {
      const newOrder = new Order();
      newOrder.budget_id = budget_id;
      newOrder.advanced_payment = advanced_payment;
      newOrder.production_cost = production_cost;
      newOrder.sub_total = sub_total;
      newOrder.discount_percentage = discount_percentage;
      newOrder.additional_information = additional_information;
      newOrder.status = status;
      search_Customer.orders.push(newOrder);
      await search_Customer.save();
      res.status(200).json({
        message: "Order  Successfully Added!",
      });
    } else {
      res.status(404).json({
        message: "Customer not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: console.log(error),
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const search_Order = await orderRepository.find({
      relations: {
        order_entries: true,
      },
      where: {
        id: id,
      },
    });

    if (search_Order != null) {
      res.json(search_Order);
    } else {
      res.status(404).send({ message: "Order id not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const search_Order = await orderRepository.find({
      where: {
        id: id,
      },
    });
    if (search_Order != null) {
      const {
        budget_id,
        advanced_payment,
        production_cost,
        sub_total,
        discount_percentage,
        additional_information,
        status,
      } = req.body;
      const Order = await orderRepository.update(
        {
          id,
        },
        {
          budget_id: budget_id,
          advanced_payment: advanced_payment,
          production_cost: production_cost,
          sub_total: sub_total,
          discount_percentage: discount_percentage,
          additional_information: additional_information,
          status: status,
        }
      );
      res.status(200).json({
        message: "Order  Successfully Updated!",
      });
    } else {
      res.status(404).send({ message: "Order not found!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Order not found!" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const Order = await orderRepository.findOneById(id);
    if (Order !== null) {
      await orderRepository.delete({ id });
      res.status(200).send({
        message: "Order Deleted Successfully!",
      });
    } else {
      res.status(404).send({ message: "Order not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  getAllOrders,
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
