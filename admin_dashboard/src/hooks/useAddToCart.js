import { useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import { notifySuccess, notifyError } from '../utils/toast'
import { useForm } from 'react-hook-form'

const useAddToCart = () => {
  const [item, setItem] = useState(1)
  const [products, setProducts] = useState([])
  const { addItem, items, updateItemQuantity } = useCart()

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm()

  const onSubmit = ({ name }) => {
    if (!name) {
      notifyError('Ingrese un nombre')
      return
    }
  }

  useEffect(() => {
    const products = sessionStorage.getItem('products')
    setProducts(JSON.parse(products))
  }, [])

  const handleAddItem = (product) => {
    const result = items.find((i) => i.id === product.id)

    if (result !== undefined) {
      const newItem = {
        ...product,
        id: product.id,
        price: product.price,
      }
      addItem(newItem, item)
      notifySuccess(`${item} ${product.name} added to cart!`)
    } else {
      const newItem = {
        ...product,
        id: product.id,
        price: product.price,
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
    handleIncreaseQuantity,
    onSubmit,
  }
}

export default useAddToCart
