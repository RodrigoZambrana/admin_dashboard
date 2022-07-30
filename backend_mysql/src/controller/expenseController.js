const express = require("express");
const router = express.Router();
const pool = require("../config/database.js");

const getAllExpense = async (req, res) => {
  pool.query("SELECT * FROM category", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const addExpense = async (req, res) => {
  try {
    const { id, name, image_url } = req.body;
    const newCategory = { id, name, image_url };
    pool.query("INSERT INTO category set ?", [newCategory]);
    res.send("category saved");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getExpenseById = (req, res) => {
  try {
    const { id } = req.params;
    pool.query(
      "SELECT * FROM category WHERE id = ?",
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

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image_url } = req.body;
    const editCategory = { name, image_url };
    pool.query("UPDATE  category set ? WHERE id = ?", [editCategory, id]);
    res.send("category updated");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM category WHERE id = ?", [id]);
    res.send("category deleted");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  getAllExpense,
  addExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
