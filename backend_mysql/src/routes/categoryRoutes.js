const express = require("express");
const router = express.Router();

const pool = require("../config/database.js");

// INSERT A category
router.post("/add", async (req, res) => {
  const { id, name, image_url } = req.body;
  const newCategory = { id, name, image_url };
  await pool.query("INSERT INTO category set ?", [newCategory]);
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
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM employee WHERE id = ?", [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Employee Deleted" });
    } else {
      console.log(err);
    }
  });
});

router.put("/:id", (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Employee Updated" });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
