import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import Loading from "../components/preloader/Loading";
import BudgetServices from "../services/BudgetServices";
import { SidebarContext } from "../context/SidebarContext";
import CouponTable from "../components/coupon/CouponTable";
import PageTitle from "../components/Typography/PageTitle";
import MainDrawer from "../components/drawer/MainDrawer";
import CouponDrawer from "../components/drawer/CouponDrawer";

const Budgets = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, loading } = useAsync(BudgetServices.getAllCoupons);

  const {
    handleSubmitCoupon,
    couponRef,
    dataTable,
    serviceData,
    totalResults,
    resultsPerPage,
    handleChangePage,
  } = useFilter(data);

  return (
    <>
      <PageTitle>Presupuestos</PageTitle>

      <MainDrawer>
        <CouponDrawer />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitCoupon}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={couponRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder="Search by coupon code/name"
              />
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Nuevo presupuesto
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
                <TableCell>Cliente</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Telefóno</TableCell>
                <TableCell>Creado</TableCell>
                <TableCell>Validez</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell className="text-right">Acciones</TableCell>
              </tr>
            </TableHeader>
            <CouponTable budgets={dataTable} />
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
        <NotFound title="Presupuesto" />
      )}
    </>
  );
};

export default Budgets;
