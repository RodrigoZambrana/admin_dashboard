import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  Pagination,
  Button,
} from "@windmill/react-ui";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import customerServices from "../services/CustomerServices";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
import CustomerTable from "../components/customer/CustomerTable";
import { FiPlus } from "react-icons/fi";
import { SidebarContext } from "../context/SidebarContext";

const Customers = () => {
  const { data, loading } = useAsync(customerServices.getAllCustomers);
  const { toggleDrawer } = useContext(SidebarContext);

  const {
    userRef,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitUser,
  } = useFilter(data);

  const history = useHistory();

  const addCustomer = () => {
    history.push("/customer/0");
  };

  return (
    <>
      <PageTitle>Clientes</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onChange={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="buscar por nombre/email/teléfono"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={addCustomer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Agregar Cliente
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Ver compras</TableCell>
                <TableCell className="text-right">Accciones</TableCell>
              </tr>
            </TableHeader>
            <CustomerTable customers={dataTable} />
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
      ) : (
        <NotFound title="Cliente" />
      )}
    </>
  );
};

export default Customers;
