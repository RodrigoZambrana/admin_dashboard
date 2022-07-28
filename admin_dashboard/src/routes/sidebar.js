import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiUser,
  FiCompass,
  FiGift,
  FiList,
  FiSettings,
} from "react-icons/fi";
/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Estadisticas", // name that appear in Sidebar
  },
  {
    path: "/products",
    icon: FiShoppingBag,
    name: "Productos",
  },
  {
    path: "/category",
    icon: FiList,
    name: "Categorias",
  },
  {
    path: "/customers",
    icon: FiUsers,
    name: "Clientes",
  },
  {
    path: "/orders",
    icon: FiCompass,
    name: "Pedidos",
  },
  {
    path: "/coupons",
    icon: FiGift,
    name: "Coupones",
  },
  {
    path: "/our-staff",
    icon: FiUser,
    name: "Presupuestos",
  },
  {
    icon: FiSettings,
    name: "Pages",
    routes: [
      // submenu
      {
        path: "/app/404",
        name: "404",
      },
      {
        path: "/app/blank",
        name: "Blank",
      },
    ],
  },
];

export default sidebar;
