import React, { useContext } from "react";
import Drawer from "rc-drawer";
import Cart from "../cart/Cart";
import { BudgetContext } from "../../context/BudgetContext";

const BudgetDrawer = () => {
  const { cartDrawerOpen, closeCartDrawer } = useContext(BudgetContext);

  return (
    <Drawer
      open={cartDrawerOpen}
      onClose={closeCartDrawer}
      parent={null}
      level={null}
      placement={"right"}
    >
      <Cart />
    </Drawer>
  );
};
export default BudgetDrawer;
