import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  IoReturnUpBackOutline,
  IoBagHandle,
  IoArrowForward,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import { Button, Card, CardBody } from "@windmill/react-ui";

//internal import
import Layout from "../layout/Layout";
import Error from "../components/form/Error";
import CartItem from "../components/cart/CartItem";
import CheckoutForm from "../components/checkout/CheckoutForm";

import InputArea from "../components/form/InputArea";

import useCheckoutSubmit from "../hooks/useCheckoutSubmit";
import SearchCustomer from "../components/searchbar/SearchCustomer";

const Checkout = () => {
  const { setValue } = useForm();
  const {
    handleSubmit,
    submitHandler,
    register,
    errors,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
    onSubmit,
    customerBudget,
  } = useCheckoutSubmit();

  useEffect(() => {
    setValue("email", customerBudget.email);
    console.log(customerBudget.email);
  }, []);

  return (
    <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
      <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <SearchCustomer />
            <CheckoutForm />
          </CardBody>
        </Card>
      </div>

      <div className="md:h-full lg:h-full lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
        <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
          <h2 className="font-semibold font-serif text-lg pb-4">
            Resumen del presupuesto
          </h2>
          <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-80 bg-gray-50 block">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {isEmpty && (
              <div className="text-center py-10">
                <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                  <IoBagHandle />
                </span>
                <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                  No Item Added Yet!
                </h2>
              </div>
            )}
          </div>{" "}
          <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
            Subtotal
            <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          <div className="border-t mt-4">
            <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
              Costo total
              <span className="font-serif font-extrabold text-lg">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
