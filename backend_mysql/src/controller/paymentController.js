const express = require("express");
const router = express.Router();
const pool = require("../config/database.js");

const getAllPayment = async (req, res) => {
  pool.query("SELECT * FROM payment", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const addPayment = async (req, res) => {
  try {
    const {
      id,
      order_id,
      invoice_id,
      amount,
      payment_method,
      created_date,
      status,
    } = req.body;
    const newPayment = {
      id,
      order_id,
      invoice_id,
      amount,
      payment_method,
      created_date,
      status,
    };
    pool.query("INSERT INTO payment set ?", [newPayment]);
    res.send("payment saved");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getPaymentById = (req, res) => {
  try {
    const { id } = req.params;
    pool.query(
      "SELECT * FROM payment WHERE id = ?",
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

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      order_id,
      invoice_id,
      amount,
      payment_method,
      created_date,
      status,
    } = req.body;
    const editPayment = {
      id,
      order_id,
      invoice_id,
      amount,
      payment_method,
      created_date,
      status,
    };
    pool.query("UPDATE  payment set ? WHERE id = ?", [editPayment, id]);
    res.send("category updated");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM payment WHERE id = ?", [id]);
    res.send("payment deleted");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  getAllPayment,
  addPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
};
