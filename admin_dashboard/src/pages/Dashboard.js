import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from '@windmill/react-ui'
import { ImStack, ImCreditCard } from 'react-icons/im'
import { FiShoppingCart, FiTruck, FiRefreshCw, FiCheck } from 'react-icons/fi'

import useAsync from '../hooks/useAsync'
import useFilter from '../hooks/useFilter'
import OrderServices from '../services/OrderServices'
import Loading from '../components/preloader/Loading'
import ChartCard from '../components/chart/ChartCard'
import CardItem from '../components/dashboard/CardItem'
import PageTitle from '../components/Typography/PageTitle'
import OrderTable from '../components/dashboard/OrderTable'
import CardItemTwo from '../components/dashboard/CardItemTwo'
import { barOptions, doughnutOptions } from '../utils/chartsData'

const Dashboard = () => {
  const { data, loading } = useAsync(OrderServices.getAllOrders)

  const {
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    pending,
    processing,
    delivered,
    todayOrder,
    monthlyOrder,
    totalOrder,
  } = useFilter(data)

  return (
    <>
      <PageTitle>Pedidos Mensuales</PageTitle>

      {/* <div className="grid gap-4 mb-8 md:grid-cols-3 xl:grid-cols-3">
        <CardItemTwo
          title="Ventas de Hoy"
          Icon={ImStack}
          price={todayOrder}
          className="text-white dark:text-green-100 bg-teal-500"
        />
        <CardItemTwo
          title="Ventas Mensuales"
          Icon={FiShoppingCart}
          price={monthlyOrder}
          className="text-white dark:text-green-100 bg-blue-500"
        />
        <CardItemTwo
          title="Total de Ventas"
          Icon={ImCreditCard}
          price={totalOrder}
          className="text-white dark:text-green-100 bg-green-500"
        />
      </div> */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Pedidos totales"
          Icon={FiShoppingCart}
          quantity={data.length}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        <CardItem
          title="Pedidos Pendientes"
          Icon={FiRefreshCw}
          quantity={pending.length}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title="Pedidos en proceso"
          Icon={FiTruck}
          quantity={processing.length}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
        <CardItem
          title="Pedidos finalizados"
          Icon={FiCheck}
          quantity={delivered.length}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2 my-8">
        <ChartCard title="Conversions This Year">
          <Bar {...barOptions} />
        </ChartCard>
        <ChartCard title="Top Revenue Product">
          <Doughnut {...doughnutOptions} className="chart" />
        </ChartCard>
      </div> */}

      <PageTitle>Lista de Pedidos</PageTitle>
      {loading && <Loading loading={loading} />}
      {dataTable && !loading && (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Cliente</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Forma de Pago</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Estado</TableCell>
              </tr>
            </TableHeader>
            {/* <OrderTable orders={dataTable} /> */}
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
  )
}

export default Dashboard
