import React, { useContext, useState } from "react";
import { useCart } from "react-use-cart";
import { IoBagCheckOutline, IoClose, IoBagHandle } from "react-icons/io5";
import { useHistory } from "react-router-dom";

//internal import
import CartItem from "../cart/CartItem";
import { BudgetContext } from "../../context/BudgetContext";

const Cart = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { isEmpty, items, cartTotal } = useCart();
  const { toggleCartDrawer, closeCartDrawer } = useContext(BudgetContext);
  const history = useHistory();

  const handleOpenLogin = () => {
    if (history.push("/?redirect=/checkout")) {
      toggleCartDrawer();
      setModalOpen(!modalOpen);
    }
  };

  const checkoutClass = (
    <button
      onClick={closeCartDrawer}
      className="w-full py-3 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 flex items-center justify-between bg-heading text-sm sm:text-base text-white focus:outline-none transition duration-300"
    >
      <span className="align-middle font-medium font-serif">
        Proceed To Checkout
      </span>
      <span className="rounded-lg font-bold font-serif py-2 px-3 bg-white text-emerald-600">
        ${cartTotal.toFixed(2)}
      </span>
    </button>
  );

  return (
    <>
      <div className="flex flex-col w-full h-full justify-between items-middle bg-white rounded cursor-pointer">
        <div className="w-full flex justify-between items-center relative px-5 py-4 border-b bg-indigo-50 border-gray-100">
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex items-center">
            <span className="text-xl mr-2 mb-1">
              <IoBagCheckOutline />
            </span>
            Shopping Cart
          </h2>
          <button
            onClick={closeCartDrawer}
            className="inline-flex text-base items-center justify-center text-gray-500 p-2 focus:outline-none transition-opacity hover:text-red-400"
          >
            <IoClose />
            <span className="font-sens text-sm text-gray-500 hover:text-red-400 ml-1">
              Close
            </span>
          </button>
        </div>
        <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          {isEmpty && (
            <div className="flex flex-col h-full justify-center">
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center w-20 h-20 rounded-full bg-emerald-100">
                  <span className="text-emerald-600 text-4xl block">
                    <IoBagHandle />
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-gray-700 text-lg pt-5">
                  Your cart is empty
                </h3>
                <p className="px-12 text-center text-sm text-gray-500 pt-2">
                  No items added in your cart. Please add product to your cart
                  list.
                </p>
              </div>
            </div>
          )}

          {/* {items.map((item, i) => (
            <CartItem key={i + 1} item={item} />
          ))}
        </div>
        <div className="mx-5 my-3">
          {items.length <= 0 ? (
            checkoutClass
          ) : (
            <span>
              {!userInfo ? (
                <div onClick={handleOpenLogin}>{checkoutClass}</div>
              ) : (
                <button href="/checkout">
                  <a>{checkoutClass}</a>
                </button>
              )}
            </span>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Cart;
