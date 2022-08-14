import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from "@windmill/react-ui";
import { FiShoppingCart, FiTruck, FiRefreshCw, FiCheck } from "react-icons/fi";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import OrderServices from "../services/OrderServices";
import Loading from "../components/preloader/Loading";
import CardItem from "../components/dashboard/CardItem";
import PageTitle from "../components/Typography/PageTitle";
import OrderTable from "../components/dashboard/OrderTable";

const Dashboard = () => {
  const { data, loading } = useAsync(OrderServices.getAllOrders);

  const {
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    pending,
    processing,
    delivered,
  } = useFilter(data);

  return (
    <>
      <PageTitle>Resumen de Pedidos</PageTitle>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Pedidos Confirmados"
          Icon={FiShoppingCart}
          quantity={data.length}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        <CardItem
          title="Para Pedir ó Armar"
          Icon={FiRefreshCw}
          quantity={pending.length}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title="Para instalar
          "
          Icon={FiTruck}
          quantity={processing.length}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
        <CardItem
          title="Pedidos instalados"
          Icon={FiCheck}
          quantity={delivered.length}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>

      <PageTitle>Todos los Pedidos</PageTitle>
      {loading && <Loading loading={loading} />}
      {dataTable && !loading && (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Fecha</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Seña</TableCell>
                <TableCell>Importe Total</TableCell>
                <TableCell>Saldo Pendiente</TableCell>
              </tr>
            </TableHeader>
            <OrderTable orders={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      )}
    </>
  );
};

export default Dashboard;
