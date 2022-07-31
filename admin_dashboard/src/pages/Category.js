import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Button,
  Input,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import Loading from "../components/preloader/Loading";
import { SidebarContext } from "../context/SidebarContext";
import PageTitle from "../components/Typography/PageTitle";
import CategoryServices from "../services/CategoryServices";
import CategoryTable from "../components/category/CategoryTable";
import SelectCategory from "../components/form/SelectCategory";
import MainDrawer from "../components/drawer/MainDrawer";
import CategoryDrawer from "../components/drawer/CategoryDrawer";

const Category = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, loading } = useAsync(CategoryServices.getAllCategory);

  const {
    categoryRef,
    setFilter,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitCategory,
  } = useFilter(data);

  return (
    <>
      <PageTitle>Categoria</PageTitle>

      <MainDrawer>
        <CategoryDrawer />
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="w-full md:w-56 lg:w-56 xl:w-56">
            <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
              <span className="mr-3">
                <FiPlus />
              </span>
              Agregar categoria
            </Button>
          </div>
        </CardBody>
      </Card>
      {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell className="text-center">Publicada</TableCell>
                <TableCell className="text-right">Actiones</TableCell>
              </tr>
            </TableHeader>
            <CategoryTable categories={dataTable} />
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
        <NotFound title="Category" />
      )}
    </>
  );
};

export default Category;
