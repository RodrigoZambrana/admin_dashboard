import React from "react";
import { Select } from "@windmill/react-ui";

const SelectProductProvider = ({ setUnit, register, name, label }) => {
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
          Seleccione Proveedor
        </option>
        <option value="urucortinas">urucortinas</option>
        <option value="verosol">Verosol</option>
        <option value="properfil">Properfil</option>
        <option value="lidasur">Lidasur</option>
        <option value="bemaor">Bemaor</option>
      </Select>
    </>
  );
};

export default SelectProductProvider;
