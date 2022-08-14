import React from "react";
import { Badge } from "@windmill/react-ui";

const Status = ({ status }) => {
  return (
    <>
      <span className="font-serif">
        {status === "Pendiente" && <Badge type="warning">{status}</Badge>}
        {status === "Para Instalar" && <Badge>{status}</Badge>}
        {status === "Finalizado" && <Badge type="success">{status}</Badge>}
        {status === "Cancelado" && <Badge type="danger">{status}</Badge>}
      </span>
    </>
  );
};

export default Status;
