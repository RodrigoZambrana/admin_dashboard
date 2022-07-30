const express = require("express");
const router = express.Router();
const pool = require("../config/database.js");

const getAllCustomerAddress = async (req, res) => {
  const { id } = req.params;
  try {
    pool.query("SELECT * FROM address WHERE customer_id = ?", [id]);
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    };
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const { customer_id, address, city, type } = req.body;
    const newCustomerAdress = { customer_id, address, city, type };
    pool.query("INSERT INTO address set ?", [newCustomerAdress]);
    res.send("address saved");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAddressById = (req, res) => {
  try {
    const { id } = req.params;
    pool.query(
      "SELECT * FROM address WHERE id = ?",
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

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, city, type } = req.body;
    const editCustomerAdress = { address, city, type };
    pool.query("UPDATE  address set ? WHERE id = ?", [editCustomerAdress, id]);
    res.send("category updated");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    pool.query("DELETE FROM address WHERE id = ?", [id]);
    res.send("address deleted");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  getAllCustomerAddress,
  addAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
};
