const express = require("express");
const router = express.Router();
const pool = require("../config/database.js");

const getAllBudget = async (req, res) => {
  pool.query("SELECT * FROM budget", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const getAllCustomerBudget = async (req, res) => {
  const { telephone, email } = req.params;
  try {
    pool.query(
      "SELECT * FROM budget WHERE customer_telephone= ? OR customer_email= ?",
      [telephone, email]
    );
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

const addBudget = async (req, res) => {
  try {
    const {
      customer_id,
      customer_name,
      customer_telephone,
      customer_email,
      customer_address,
      created_date,
      discountPercentage,
      valid_days,
      status,
    } = req.body;
    const newBudget = {
      customer_id,
      customer_name,
      customer_telephone,
      customer_email,
      customer_address,
      created_date,
      discountPercentage,
      valid_days,
      status,
    };
    pool.query("INSERT INTO budget set ?", [newBudget]);
    res.send("budget saved");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getBudgetById = (req, res) => {
  try {
    const { id } = req.params;
    pool.query(
      "SELECT * FROM budget WHERE id = ?",
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

const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customer_id,
      customer_name,
      customer_telephone,
      customer_email,
      customer_address,
      created_date,
      discountPercentage,
      valid_days,
      status,
    } = req.body;
    const editBudget = {
      customer_id,
      customer_name,
      customer_telephone,
      customer_email,
      customer_address,
      created_date,
      discountPercentage,
      valid_days,
      status,
    };
    const editBudget = { name, image_url };
    pool.query("UPDATE  budget set ? WHERE id = ?", [editBudget, id]);
    res.send("budget updated");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteBudget = async (req, res) => {
  //ver el eliminar de los budget_entry asociado- eliminar en cascada
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM budget WHERE id = ?", [id]);
    res.send("budget deleted");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addBudget,
  getAllBudget,
  getAllCustomerBudget,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
