import React from "react";
import { Select } from "@windmill/react-ui";

const SelectProductUnit = ({ setUnit, register, name, label }) => {
  return (
    <>
      <Select
        onChange={(e) => setUnit(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Unidad de Medida
        </option>
        <option value="METERS">Metros lineales</option>
        <option value="SUQARE_METERS">Metros Cuadrados</option>
        <option value="UNIT">Unidad</option>
      </Select>
    </>
  );
};

export default SelectProductUnit;
