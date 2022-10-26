import { useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import { notifySuccess, notifyError } from '../utils/toast'
import { useForm } from 'react-hook-form'

const useAddToCart = () => {
  const [item, setItem] = useState(1)
  const [product, setProduct] = useState()
  const [products, setProducts] = useState([])
  const { addItem, items, updateItemQuantity } = useCart()

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm()

  const onSubmit = ({ width, height, description }) => {
    // notifyError('El nombre del producto es:' + product.name)
    if (product.unit === 'Metros Cuadrados') {
      const newProduct = {
        id: product.id + width + height,
        name: product.name,
        image: product.image,
        width: width,
        height: description,
        price: product.price * width * height,
      }
      handleAddItem(newProduct)
    }
    if (product.unit === 'Metros lineales') {
      notifySuccess('added to cart!')
    }
    if (product.unit === 'Unidad') {
      handleAddItem(product)
    }
  }

  useEffect(() => {
    const products = sessionStorage.getItem('products')
    setProducts(JSON.parse(products))
  }, [])

  const handleAddItem = (cartProduct) => {
    const result = items.find((i) => i.id === cartProduct.id)

    if (result !== undefined) {
      const newItem = {
        ...cartProduct,
        id: cartProduct.id,
        price: cartProduct.price,
      }
      addItem(newItem, item)
      notifySuccess(`${item} ${product.name} added to cart!`)
    } else {
      const newItem = {
        ...cartProduct,
        id: cartProduct.id,
        price: cartProduct.price,
      }
      addItem(newItem, item)
      notifySuccess(`${item} ${product.name} added to cart!`)
    }
  }

  const handleIncreaseQuantity = (item) => {
    const result = items?.find((p) => p.id === item.id)
    console.log('el resultado es:' + result)
    if (result) {
      // if (item?.stock < result?.quantity) {
      updateItemQuantity(item.id, item.quantity + 1)
      // } else {
      //   notifyError('No more quantity available for this product!')
      // }
    }
  }

  return {
    register,
    handleSubmit,
    setValue,
    handleAddItem,
    setItem,
    item,
    setProduct,
    handleIncreaseQuantity,
    onSubmit,
    errors,
  }
}

export default useAddToCart
