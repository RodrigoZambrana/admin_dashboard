import React from 'react'

const Discount = ({ product, card }) => {
  return (
    <div className="font-serif product-price font-bold">
      <span
        className={
          card
            ? 'inline-block text-sm font-semibold text-gray-800'
            : 'inline-block text-2xl'
        }
      >
        US${product.price}
      </span>
    </div>
  )
}

export default Discount
