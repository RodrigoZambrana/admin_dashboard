const express = require("express");
const router = express.Router();
const pool = require("../config/database.js");

const getAllCustomer = async (req, res) => {
  pool.query("SELECT * FROM customer", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const addCustomer = async (req, res) => {
  try {
    const { id, full_name, email_address, telephone, user_id } = req.body;
    const newCustomer = { id, full_name, email_address, telephone, user_id };
    pool.query("INSERT INTO customer set ?", [newCustomer]);
    res.send("customer saved");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getCustomerById = (req, res) => {
  try {
    const { id } = req.params;
    pool.query(
      "SELECT * FROM customer WHERE id = ?",
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

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email_address, telephone, user_id } = req.body;
    const updateCustomer = { id, full_name, email_address, telephone, user_id };
    pool.query("UPDATE  customer set ? WHERE id = ?", [updateCustomer, id]);
    res.send("service updated");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM customer WHERE id = ?", [id]);
    res.send("service deleted");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
