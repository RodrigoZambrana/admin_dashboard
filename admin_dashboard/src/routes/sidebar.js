import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiUser,
  FiShoppingCart,
  FiFile,
  FiList,
  FiSettings,
  FiCalendar,
  FiClipboard,
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
    name: "Principal", // name that appear in Sidebar
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
    icon: FiShoppingCart,
    name: "Pedidos",
  },
  {
    path: "/budgets",
    icon: FiFile,
    name: "Presupuestos",
  },
  {
    path: "/calendar",
    icon: FiCalendar,
    name: "Agenda",
  },
  {
    path: "/notes",
    icon: FiClipboard,
    name: "Notas",
  },
  {
    icon: FiSettings,
    name: "Avanzado",
    routes: [
      // submenu
      {
        path: "/our-staff",
        icon: FiUser,
        name: "Usuarios",
      },
      {
        path: "/404",
        name: "404",
      },
    ],
  },
];

export default sidebar;
