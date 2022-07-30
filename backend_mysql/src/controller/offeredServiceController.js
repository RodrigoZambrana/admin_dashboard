const express = require("express");
const router = express.Router();
const pool = require("../config/database.js");

const getAllService = async (req, res) => {
  pool.query("SELECT * FROM service", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const addService = async (req, res) => {
  try {
    const { id, service_name, cost, description } = req.body;
    const newService = { id, service_name, cost, description };
    pool.query("INSERT INTO service set ?", [newService]);
    res.send("service saved");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getServiceById = (req, res) => {
  try {
    const { id } = req.params;
    pool.query(
      "SELECT * FROM service WHERE id = ?",
      [id],
      (err, rows, fields) => {
        if (!err) {
          res.json(rows[0]);
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { id, service_name, cost, description } = req.body;
    const editCategory = { id, service_name, cost, description };
    pool.query("UPDATE  service set ? WHERE id = ?", [editCategory, id]);
    res.send("service updated");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM service WHERE id = ?", [id]);
    res.send("service deleted");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addService,
  getAllService,
  getServiceById,
  updateService,
  deleteService,
};
