import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import { FiEye, FiTrash2 } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";
import MainModal from "../modal/MainModal";
import { SidebarContext } from "../../context/SidebarContext";
import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";

const CustomerTable = ({ customers }) => {
  const [customerId, setCustomerId] = useState("");
  const { toggleModal } = useContext(SidebarContext);
  const { handleUpdate } = useToggleDrawer();

  const handleModalOpen = (id) => {
    setCustomerId(id);
    toggleModal();
  };

  return (
    <>
      <MainModal id={customerId} />
      <TableBody>
        {customers?.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>
              <span className="text-sm">{customer.full_name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{customer.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{customer.telephone}</span>
            </TableCell>
            <TableCell>
              {customer.addresses.length > 0 ? (
                <span className="text-sm font-medium">
                  {customer.addresses[0].street}
                </span>
              ) : (
                <span className="text-sm font-medium">-</span>
              )}
            </TableCell>
            <TableCell>
              <Link
                to={`/customer-order/${customer.id}`}
                className="flex justify-center text-center text-gray-400 hover:text-green-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiEye}
                  title="Ver compras"
                  bgColor="#34D399"
                />
              </Link>
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={customer.id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTable;
