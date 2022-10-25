import React from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow, Badge } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import CouponDrawer from "../drawer/CouponDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";

const CouponTable = ({ budgets }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <CouponDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {budgets.map((budget, i) => (
          <TableRow key={budget.id}>
            <TableCell>
              {" "}
              <span className="text-sm"> {budget.customer_name}</span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm"> {budget.customer_address}</span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm"> {budget.customer_telephone}</span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm">
                {" "}
                {dayjs(budget.created_at).format("DD/MM/YYYY")}
              </span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm"> {budget.valid_days} días</span>{" "}
            </TableCell>
            <TableCell className="align-middle ">
              {dayjs(budget.created_at)
                .add(budget.valid_days, "day")
                .isAfter(dayjs(new Date())) ? (
                <Badge type="success">{budget.status}</Badge>
              ) : (
                <Badge type="danger">Vencido</Badge>
              )}
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={budget.id}
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

export default CouponTable;
