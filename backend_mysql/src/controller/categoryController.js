const express = require('express')
const router = express.Router()
const pool = require('../config/database.js')

const addCategory = async (req, res) => {
  const { id, name, image_url } = req.body
  const newCategory = { id, name, image_url }
  pool.query('INSERT INTO category set ?', [newCategory])
  res.send('category saved')
}

const getAllCategory = async (req, res) => {
  pool.query('SELECT * FROM category', (err, rows, fields) => {
    if (!err) {
      res.json(rows)
    } else {
      console.log(err)
    }
  })
}

const getCategoryById = (req, res) => {
  const { id } = req.params
  pool.query(
    'SELECT * FROM category WHERE id = ?',
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0])
      } else {
        console.log(err)
      }
    },
  )
}

const updateCategory = async (req, res) => {
  const { id } = req.params
  const { name, image_url } = req.body
  const editCategory = { name, image_url }
  pool.query('UPDATE  category set ? WHERE id = ?', [editCategory, id])
  res.send('category updated')
}

const deleteCategory = async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM category WHERE id = ?', [id])
  res.send('category deleted')
}

module.exports = {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
