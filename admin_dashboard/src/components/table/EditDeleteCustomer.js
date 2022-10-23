import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";

const addCustomer = () => {
  history.push("/customer/0");
};

const EditDeleteButton = ({ id, handleModalOpen }) => {
  return (
    <>
      <div className="flex justify-end text-right">
        <div
          onClick={addCustomer}
          className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
        >
          <Tooltip id="edit" Icon={FiEdit} title="Editar" bgColor="#10B981" />
        </div>

        <div
          onClick={() => handleModalOpen(id)}
          className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
        >
          <Tooltip
            id="delete"
            Icon={FiTrash2}
            title="Eliminar"
            bgColor="#EF4444"
          />
        </div>
      </div>
    </>
  );
};

export default EditDeleteButton;
