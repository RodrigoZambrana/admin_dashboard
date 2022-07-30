const express = require("express");
const router = express.Router();
const pool = require("../config/database.js");

const addSubCategory = async (req, res) => {
  const { id, name, category_id, image_url } = req.body;
  const newSubCategory = { id, name, category_id, image_url };
  pool.query("INSERT INTO sub_category set ?", [newSubCategory]);
  res.send("New sub category saved");
};

const getAllSubCategory = async (req, res) => {
  pool.query("SELECT * FROM sub_category", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const getSubCategoryById = (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM sub_category WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
};

const updateSubCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image_url } = req.body;
  const editSubCategory = { name, image_url };
  pool.query("UPDATE  sub_category set ? WHERE id = ?", [editSubCategory, id]);
  res.send("sub_category updated");
};

const deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM sub_category WHERE id = ?", [id]);
  res.send("sub_category deleted");
};

module.exports = {
  addSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
