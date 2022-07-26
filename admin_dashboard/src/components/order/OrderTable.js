import React from "react";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

import Status from "../table/Status";
import { FiEye } from "react-icons/fi";
import Tooltip from "../tooltip/Tooltip";
import SelectStatus from "../form/SelectStatus";

const OrderTable = ({ orders }) => {
  return (
    <>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <span className="text-sm">
                {dayjs(order.created_at).format("DD/MM/YYYY")}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm ">{order.customer.full_name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm ">
                {order.customer.addresses[0].street}
              </span>
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm">{order.customer.telephone}</span>
            </TableCell>
            <TableCell>
              <Status status={order.status} />
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                ${Math.round(order.advanced_payment)}
              </span>
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm font-semibold">
                ${Math.round(order.sub_total)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                ${Math.round(order.sub_total - order.advanced_payment)}
              </span>{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
