import React from "react";
import { Select } from "@windmill/react-ui";
import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";

const SelectProductCategory = ({ setCategory, register, name, label }) => {
  const { data } = useAsync(CategoryServices.getAllCategory); //   console.log(value);
  return (
    <>
      <Select
        onChange={(e) => setCategory(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Seleccione categoria
        </option>
        {data.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectProductCategory;
