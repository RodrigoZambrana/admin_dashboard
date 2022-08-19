import React, { useEffect, useState } from "react";

import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";

const ChildrenCategory = ({ value }) => {
  const [categories, setCategories] = useState([]);

  const { data } = useAsync(CategoryServices.getAllCategory);
  useEffect(() => {
    if (value) {
      const filter = data.filter((category) => {
        return category.id == value;
      });
      setCategories(filter[0]);
    } else {
      setCategories([""]);
    }
  }, [data, value]);

  return (
    <>
      {categories.length > 0 ? (
        categories.subCategories.map((subcategory) => (
          <option key={subcategory.id} value={subcategory.id}>
            {subcategory.name}
          </option>
        ))
      ) : (
        <option value={-1} defaultValue hidden>
          Seleccione una subcategoria
        </option>
      )}
    </>
  );
};

export default ChildrenCategory;
