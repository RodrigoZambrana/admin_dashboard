const express = require("express");
const pool = require("../config/database.js");

const getAllEntriesByBudgetId = async (req, res) => {
  const { id } = req.params;
  try {
    pool.query("SELECT * FROM budget_entry WHERE budget_id = ?", [id]);
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

const addBudgetEntry = async (req, res) => {
  try {
    const {
      budget_id,
      product_id,
      width,
      height,
      advance,
      quantity,
      unit_cost,
      additional_information,
    } = req.body;
    const budgetEntry = {
      budget_id,
      product_id,
      width,
      height,
      advance,
      quantity,
      unit_cost,
      additional_information,
    };
    pool.query("INSERT INTO budget_entry set ?", [budgetEntry]);
    res.send("budget etnry saved");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getBudgetEntryById = (req, res) => {
  try {
    const { id } = req.params;
    pool.query(
      "SELECT * FROM budget_entry WHERE id = ?",
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

const updateBudgetEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      budget_id,
      product_id,
      width,
      height,
      advance,
      quantity,
      unit_cost,
      additional_information,
    } = req.body;
    const budgetEntry = {
      budget_id,
      product_id,
      width,
      height,
      advance,
      quantity,
      unit_cost,
      additional_information,
    };
    pool.query("UPDATE  budget_entry set ? WHERE id = ?", [budgetEntry, id]);
    res.send("budget updated");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteBudgetEntry = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM budget_entry WHERE id = ?", [id]);
    res.send("category deleted");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  getAllEntriesByBudgetId,
  addBudgetEntry,
  getBudgetEntryById,
  updateBudgetEntry,
  deleteBudgetEntry,
};
