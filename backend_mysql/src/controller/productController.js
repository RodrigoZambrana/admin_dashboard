const express = require('express')
const pool = require('../config/database.js')

const getAllProducts = async (req, res) => {
  try {
    pool.query('SELECT * FROM product', (err, rows, fields) => {
      if (!err) {
        res.json(rows)
      } else {
        console.log(err)
      }
    })
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}

const addProduct = async (req, res) => {
  try {
    const create_date = new Date()
    const update_date = new Date()
    const {
      title,
      price,
      former_price,
      measurement_unit,
      category_id,
      sub_category_id,
      provider_name,
      tags,
      stock,
      images,
      description,
      visible,
      aditional_information,
    } = req.body
    const newProduct = {
      title,
      price,
      former_price,
      measurement_unit,
      category_id,
      sub_category_id,
      provider_name,
      tags,
      stock,
      images,
      description,
      visible,
      create_date,
      update_date,
      aditional_information,
    }
    pool.query('INSERT INTO product set ?', [newProduct])
    res.send('product created')
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const update_date = new Date()
    const create_date = new Date('December 17, 1995 03:24:00')
    const { id } = req.params
    const {
      title,
      price,
      former_price,
      measurement_unit,
      category_id,
      sub_category_id,
      provider_name,
      tags,
      stock,
      images,
      description,
      visible,
      aditional_information,
    } = req.body
    const updatedProduct = {
      title,
      price,
      former_price,
      measurement_unit,
      category_id,
      sub_category_id,
      provider_name,
      tags,
      stock,
      images,
      description,
      visible,
      create_date,
      update_date,
      aditional_information,
    }
    pool.query('UPDATE  product set ? WHERE id = ?', [updatedProduct, id])
    res.send('product updated')
  } catch (err) {
    res.status(404).send(err.message)
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.send(product)
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}
const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      })
    } else {
      res.status(200).send({
        message: 'Product Deleted Successfully!',
      })
    }
  })
}
const updateStatus = (req, res) => {
  const newStatus = req.body.status
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        })
      } else {
        res.status(200).send({
          message: `Product ${newStatus} Successfully!`,
        })
      }
    },
  )
}

const getStockOutProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $lt: 1 } }).sort({
      _id: -1,
    })

    res.send(products)
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}

//se usaria para el front en de la tienda
const getShowingProducts = async (req, res) => {
  try {
    pool.query(
      'SELECT * FROM product ? WHERE showing = ?',
      true,
      (err, rows, fields) => {
        if (!err) {
          res.json(rows[0])
        } else {
          console.log(err)
        }
      },
    )
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
    res.send(product)
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    })
  }
}

const getDiscountedProducts = async (req, res) => {
  try {
    const products = await Product.find({ discount: { $gt: 5 } }).sort({
      _id: -1,
    })
    res.send(products)
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}

module.exports = {
  addProduct,
  getAllProducts,
  getShowingProducts,
  getDiscountedProducts,
  getStockOutProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  updateStatus,
  deleteProduct,
}
