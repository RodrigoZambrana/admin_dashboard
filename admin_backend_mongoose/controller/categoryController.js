const Category = require('../models/Category')

const addCategory = async (req, res) => {
  const { id, name, image_url } = req.body
  const newCategory = { id, name, image_url }
  pool.query('INSERT INTO category set ?', [newCategory])
  res.send('category saved')
}

const addAllCategory = async (req, res) => {
  try {
    await Category.insertMany(req.body)
    res.status(200).send({
      message: 'Category Added successfully!',
    })
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
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

const deleteCategory = (req, res) => {
  Category.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      })
    } else {
      res.status(200).send({
        message: 'Category Deleted Successfully!',
      })
    }
  })
}

module.exports = {
  addCategory,
  addAllCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
