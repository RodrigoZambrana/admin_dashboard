import React, { useEffect, useState } from 'react'

import useAsync from '../../hooks/useAsync'
import CategoryServices from '../../services/CategoryServices'

const ChildrenCategory = ({ value }) => {
  const [categories, setCategories] = useState([])
  console.log(value)
  const { data } = useAsync(CategoryServices.getAllCategory)
  useEffect(() => {
    if (value) {
      const result = data.filter((category) => {
        return category.id == value
      })
      setCategories(result)
      console.log(categories)
    } else {
      setCategories(data)
    }
  }, [data, value])

  return (
    <>
      {categories.map((category) => {
        return category.subCategories.map((children) => (
          <option key={children.id} value={children.id}>
            {children.name}
          </option>
        ))
      })}
    </>
  )
}

export default ChildrenCategory
