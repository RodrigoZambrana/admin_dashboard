import { lazy } from 'react'

// use lazy for better code splitting
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Products = lazy(() => import('../pages/Products'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))
const Category = lazy(() => import('../pages/Category'))
const Staff = lazy(() => import('../pages/Staff'))
const Customers = lazy(() => import('../pages/Customers'))
const CustomerAdd = lazy(() => import('../pages/CustomerAdd'))
const CustomerOrder = lazy(() => import('../pages/CustomerOrder'))
const Orders = lazy(() => import('../pages/Orders'))
const OrderInvoice = lazy(() => import('../pages/OrderInvoice'))
const Presupuestos = lazy(() => import('../pages/Budgets'))
const Page404 = lazy(() => import('../pages/404'))
const EditProfile = lazy(() => import('../pages/EditProfile'))
const Calendar = lazy(() => import('../pages/Calendar'))
const Kanban = lazy(() => import('../pages/Kanban'))
const Market = lazy(() => import('../pages/Market'))
const Checkout = lazy(() => import('../pages/Checkout'))

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/products',
    component: Products,
  },
  {
    path: '/market',
    component: Market,
  },
  {
    path: '/product/:id',
    component: ProductDetails,
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/customers',
    component: Customers,
  },
  {
    path: '/customer/:id',
    component: CustomerAdd,
  },
  {
    path: '/customer-order/:id',
    component: CustomerOrder,
  },
  {
    path: '/our-staff',
    component: Staff,
  },
  {
    path: '/orders',
    component: Orders,
  },
  {
    path: '/order/:id',
    component: OrderInvoice,
  },
  {
    path: '/budgets',
    component: Presupuestos,
  },
  { path: '/setting', component: EditProfile },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/edit-profile',
    component: EditProfile,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/notes',
    component: Kanban,
  },
  {
    path: '/checkout',
    component: Checkout,
  },
]

export default routes
