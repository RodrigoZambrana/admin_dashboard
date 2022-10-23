import { Request, Response } from "express";
import { EventData } from "../entity/EventData";
import { Customer } from "../entity/Customer";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { AppDataSource } from "../db";

const agendaRepository = AppDataSource.getRepository(EventData);
const customerRepository = AppDataSource.getRepository(Customer);

//categories and products of Address
export const getAllAgenda = async (req: Request, res: Response) => {
  try {
    console.log("prametro recibido:" + req.body.params.StartDate);
    const startTime = new Date(String(req.body.params.StartDate));
    const endTime = new Date(String(req.body.params.EndDate));

    console.log("inicio:" + startTime);
    console.log("fin:" + endTime);

    const users = await agendaRepository
      .createQueryBuilder("agenda")
      .where("agenda.StartTime >= :startTime", {
        startTime: req.body.params.StartDate,
      })
      .andWhere("agenda.EndTime <= :endTime", {
        endTime: req.body.params.EndDate,
      })
      .getMany();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const addAgenda = async (req: Request, res: Response) => {
  try {
    let newAgenda = new EventData();
    newAgenda.Subject = req.body.added[0].Subject;
    newAgenda.StartTime = req.body.added[0].StartTime;
    newAgenda.EndTime = req.body.added[0].EndTime;
    newAgenda.Location = req.body.added[0].Location;
    newAgenda.isAllDay = req.body.added[0].isAllDay;
    console.log("para agregar:" + newAgenda);
    await newAgenda.save();
    res.status(200).json({
      message: "Address  Successfully Added!",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getAgendaById = async (req: Request, res: Response) => {
  try {
    const Id = Number(req.params.Id);
    const search_Address = await agendaRepository.find({
      where: {
        Id: Id,
      },
    });

    if (search_Address != null) {
      res.json(search_Address);
    } else {
      res.status(404).send({ message: "Address id not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const updateAgenda = async (req: Request, res: Response) => {
  try {
    const Id = Number(req.params.id);
    const search_Address = await agendaRepository.find({
      where: {
        Id: Id,
      },
    });
    if (search_Address != null) {
      const { street, number, apartment, corner } = req.body;
      const address = await agendaRepository.update(
        {
          Id,
        },
        {}
      );
      res.status(200).json({
        message: "Address  Successfully Updated!",
      });
    } else {
      res.status(404).send({ message: "Address not found!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Address not found!" });
  }
};

export const deleteAgenda = async (req: Request, res: Response) => {
  try {
    const Id = Number(req.body.params.Id);
    const address = await agendaRepository.findOneById(Id);
    if (address !== null) {
      await agendaRepository.delete({ Id });
      res.status(200).send({
        message: "Address Deleted Successfully!",
      });
    } else {
      res.status(404).send({ message: "Address not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getAddressByCustomerId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const search_Address = await agendaRepository.find({
      relations: ["customer"],
      where: {},
    });

    if (search_Address != null) {
      res.json(search_Address);
    } else {
      res.status(404).send({ message: "Address id not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  getAllAgenda,
  addAgenda,
  getAgendaById,
  updateAgenda,
  deleteAgenda,
};
