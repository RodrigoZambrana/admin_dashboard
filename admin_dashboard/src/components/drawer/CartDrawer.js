import React, { useContext } from "react";
import Drawer from "rc-drawer";

//internal import
import Cart from "../cart/Cart";

const CartDrawer = () => {
  return (
    <Drawer open={true} parent={null} level={null} placement={"right"}>
      <Cart />
    </Drawer>
  );
};
export default CartDrawer;
