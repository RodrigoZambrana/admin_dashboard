import React, { useEffect, useState } from "react";
import { Select } from "@windmill/react-ui";
import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";

const SelectOption = ({ register, name, label }) => {
  const { data } = useAsync(CategoryServices.getAllCategory);

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Select type
        </option>
        {data.map((category) => {
          category.subCategories.map((subCategories) => (
            <option key={subCategories.id} value={subCategories.id}>
              {subCategories.name}
            </option>
          ));
        })}
      </Select>
    </>
  );
};

export default SelectOption;
