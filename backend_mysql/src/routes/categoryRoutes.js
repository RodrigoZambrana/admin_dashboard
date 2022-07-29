const express = require("express");
const router = express.Router();

const pool = require("../config/database.js");

// INSERT A category
router.post("/add", async (req, res) => {
  const { id, name, image_url } = req.body;
  const newCategory = { id, name, image_url };
  pool.query("INSERT INTO category set ?", [newCategory]);
  res.send("category saved");
});

// GET all categories
router.get("/all", (req, res) => {
  pool.query("SELECT * FROM category", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET A Category
router.get("/id=:id", (req, res) => {
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
});

// DELETE An category
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM category WHERE id = ?", [id]);
  res.send("category deleted");
});

// UPDATE An category
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, image_url } = req.body;
  const editCategory = { name, image_url };
  pool.query("UPDATE  category set ? WHERE id = ?", [editCategory, id]);
  res.send("category updated");
});

module.exports = router;
